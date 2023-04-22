import { EntitySchema, MixedList } from "typeorm";
import User from "./User";

export default [
    User
  ] as MixedList<string | Function | EntitySchema<any>>;