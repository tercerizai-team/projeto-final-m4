import * as express from "express";
import * as yup from "yup";

declare global {
    namespace Express {
        interface Request {
            userEmail: string,
            userId: string,
            userIsAdm: boolean
        }
    }
}