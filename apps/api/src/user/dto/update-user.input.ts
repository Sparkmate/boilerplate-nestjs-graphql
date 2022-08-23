import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateUserInput } from "../../auth/dto/create-user.input";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  userId: string;
}
