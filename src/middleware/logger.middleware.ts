import { Request, Response } from "express";
const winston = require("winston");
const morgan = require("morgan");


export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            level: "debug",
        }),
    ],
});

morgan.format(
    "myformat",
    '[:date[iso]] ":method :url" :status :res[content-length] - :response-time ms - IP: :remote-addr'
);

export const morganMiddleware = morgan("myformat", {
    stream: {
        write: (message: any) => logger.debug(message.trim()),
    },
    skip: (req: Request, res: Response) => {
        const urlsToSkip = [
            "/api/example/create",
        ];
        return urlsToSkip.includes(req.originalUrl);
    },
});
