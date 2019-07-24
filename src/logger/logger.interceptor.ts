import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
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

        this.logger.info({
            method: request.method,
            url: request.originalUrl,
            body: request.body,
            params: request.params,
            statusCode: response.statusCode,
            headers: request.headers,
            ip: request.ip,
            remoteAddress: request.connection.remoteAddress,
        });

        return next.handle();
    }
}
