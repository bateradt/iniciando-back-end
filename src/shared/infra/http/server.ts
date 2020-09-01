import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';
import fs from 'fs';
import { exit } from 'process';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from '@shared/infra/middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

try {
    if (!fs.existsSync('.env')) {
        console.log(
            'Please configure environment variables with .env fallowing .env.example',
        );
        exit();
    }
} catch (err) {
    console.error(err);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    // console.error(err);

    return response.status(500).json({
        status: 'error',
        message: `Internal server error ${err.message}`,
    });
});

app.listen('3333', () => {
    console.log('Server started on port 3333');
});
