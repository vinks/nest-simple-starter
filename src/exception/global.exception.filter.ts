import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import uuid from 'uuid/v1';
import StackUtils from 'stack-utils';
import { LoggerService } from '../logger';
import { IntegrationError } from './integration.error';

const stack = new StackUtils({
    cwd: process.cwd(),
    internals: StackUtils.nodeInternals(),
});

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly logger: LoggerService,
        private readonly sendClientInternalServerErrorCause: boolean = false,
    ) {}

    public catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const responseStatus = exception.status
            ? exception.status
            : HttpStatus.INTERNAL_SERVER_ERROR;
        let errorId;
        let integrationErrorDetails;

        if (responseStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
            errorId = uuid();
            integrationErrorDetails = this.extractIntegrationErrorDetails(
                exception,
            );

            const trace = exception.stack && stack.clean(exception.stack);

            const { originalUrl, body, params, query, method } = request;

            this.logger.error(
                {
                    errorId,
                    environment: process.env.NODE_ENV,
                    method,
                    originalUrl,
                    body,
                    params,
                    query,
                    ip: request.ip,
                    integrationErrorDetails,
                },
                trace,
            );
        }

        response.status(responseStatus).json({
            errorId,
            message: this.getClientResponseMessage(responseStatus, exception),
            integrationErrorDetails:
                responseStatus === HttpStatus.INTERNAL_SERVER_ERROR &&
                this.sendClientInternalServerErrorCause
                    ? integrationErrorDetails
                    : undefined,
        });
    }

    private extractIntegrationErrorDetails(error: any): string {
        if (!(error instanceof IntegrationError)) {
            return undefined;
        }

        if (!error.causeError) {
            return undefined;
        }

        if (error.causeError instanceof String) {
            return error.causeError as string;
        }

        if (!error.causeError.message && !error.causeError.response) {
            return undefined;
        }

        const integrationErrorDetails = {
            message: error.causeError.message,
            details:
                error.causeError.response && error.causeError.response.data,
        };

        return JSON.stringify({ causeError: integrationErrorDetails });
    }

    private getClientResponseMessage(
        responseStatus: number,
        exception: any,
    ): string {
        if (
            responseStatus !== HttpStatus.INTERNAL_SERVER_ERROR ||
            (responseStatus === HttpStatus.INTERNAL_SERVER_ERROR &&
                this.sendClientInternalServerErrorCause)
        ) {
            return exception.message;
        }

        return 'Internal server error';
    }
}
