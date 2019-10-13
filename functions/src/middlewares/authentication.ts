import * as express from "express";

export function checkAuth(req: express.Request, res: express.Response, next: express.NextFunction) {

  next();
}