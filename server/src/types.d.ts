import { Request, Response } from "express";
import { DataSource } from "typeorm";

export {};

export global {
  interface MyContext {
    req: Request & {session:{userId:number}};
    res: Response ;
    db: DataSource;
  }
}
