import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import {ContextType} from "@nestjs/common";
import {ContextualGraphqlRequest} from "../../../index";

@ObjectType()
export default class File {
  @Field(() => Int)
  id: number;

  @Field()
  uri: string;

  @Field()
  initialFilename: string;

  @Field()
  filename: string;

  @Field()
  path: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  context?: ContextualGraphqlRequest;
}
