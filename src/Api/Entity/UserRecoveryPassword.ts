import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql";
import { ContextualGraphqlRequest } from "../../index";

@ObjectType()
export default class UserRecoveryPassword {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  code: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  usedAt: Date;

  context?: ContextualGraphqlRequest;
}
