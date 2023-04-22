import { Arg, Int, Query, Resolver, Mutation } from "type-graphql";
import User from "../entities/User";
import UserInput from "../inputs/UserInput";
import { DeleteResult } from "typeorm";

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
  @Mutation(() => User)
  async createUser(
    @Arg("data")
    data: UserInput
  ): Promise<User> {
    const user = User.create({ ...data });
    await user.save();
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("data")
    data: UserInput,
    @Arg("id")
    id: number
  ): Promise<User | null> {
    const user = await User.findOneBy({ id });
    if (user) {
      user.age = data.age || user.age;
      user.firstName = data.firstName || user.firstName;
      user.lastName = data.lastName || user.lastName;
      await user.save();
      return user;
    }
    return null;
  }
  @Query(() => Boolean)
  async deleteUser(
    @Arg("id")
    id: number
  ): Promise<true> {
    const deleted = await  User.delete({id})
    
    return true;
  }
}
