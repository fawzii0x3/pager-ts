import {
  Arg,
  Int,
  Query,
  Resolver,
  Mutation,
  ObjectType,
  Field,
  Ctx,
} from "type-graphql";
import User from "../entities/User";
import { UserLoginInput, UserRegisterInput } from "../inputs/UserInput";
import { hash, verify } from "argon2";
@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  Users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  user(@Arg("id", () => Int) { id }: User): Promise<User | null> {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => UserResponse, { nullable: true })
  async register(
    @Arg("data")
    data: UserRegisterInput
  ): Promise<UserResponse> {
    if (data.name.length <= 2) {
      return {
        errors: [
          {
            field: "name",
            message: "name must be greater than 2",
          },
        ],
      };
    }
    if (data.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "password must be greater than 2",
          },
        ],
      };
    }
    try {
      data.password = await hash(data.password);
    } catch (error) {
      return {
        errors: [
          {
            field: "server Error",
            message: error.message,
          },
        ],
      };
    }
    const user = User.create({ ...data });
    try {
      await user.save();
    } catch (err) {
      if (err.message.includes("duplicate key")) {
        return {
          errors: [
            {
              field: "email",
              message: "email already exist",
            },
          ],
        };
      }

      return {
        errors: [
          {
            field: "saving Error",
            message: err.message,
          },
        ],
      };
    }
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("data")
    data: UserLoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOneBy({ email: data.email });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "could not find a user",
          },
        ],
      };
    }
    const checkPassword = await verify(user.password, data.password);
    if (!checkPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "password doesn't match",
          },
        ],
      };
    }
    req.session.userId = user.id;
    return { user };
  }

  @Query(() => UserResponse)
  async MeUser(@Ctx() { req }: MyContext): Promise<UserResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "token",
            message: "no auth token",
          },
        ],
      };
    }
    const user = await User.findOneBy({ id: req.session.userId });
    if (!user) {
      return {
        errors: [
          {
            field: "invalid token",
            message: "no user with this session token",
          },
        ],
      };
    }
    return { user };
  }
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie("cookTheCookie");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
