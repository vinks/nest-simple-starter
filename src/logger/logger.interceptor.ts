import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import onHeaders from 'on-headers';
import { LoggerService } from './logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(
        private readonly logger: LoggerService,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();
        const requestId = request.header('x-request-id');

        this.logger.setRequestId(requestId);

        const startAt = process.hrtime();

        onHeaders(response, () => {
            const diff = process.hrtime(startAt);
            const time = diff[0] * 1e3 + diff[1] * 1e-6;
            const val = `${time.toFixed(3)}ms`;

            const { originalUrl, body, params, query, method } = request;

            if (response.statusCode !== 500) {
                this.logger.info({
                    method,
                    originalUrl,
                    time: val,
                    body,
                    params,
                    query,
                    ip: request.ip,
                });
            }

            response.setHeader('X-Response-Time', val);
        });

        return next.handle();
    }
}
