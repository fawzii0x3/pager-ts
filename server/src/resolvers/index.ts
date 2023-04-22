import { NonEmptyArray } from "type-graphql";
import UserResolver from "./User.resolver";

export default [UserResolver] as NonEmptyArray<Function> | NonEmptyArray<string>;
