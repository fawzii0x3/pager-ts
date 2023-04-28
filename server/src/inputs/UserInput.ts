import { Field, InputType } from "type-graphql";

@InputType()
export class UserRegisterInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class UserLoginInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
