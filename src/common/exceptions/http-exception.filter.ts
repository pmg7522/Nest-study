import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const res = ctx.getResponse<Response>();

        const status = exception.getStatus();
        const error = exception.getResponse() as {
            resultCode: number;
            message: string;
        };

        res.status(status).json({
            resultCode: error.resultCode,
            message: error.message,
            data: null,
        });
    }
}
