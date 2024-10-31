import { Field, GraphQLISODateTime, Int, ObjectType } from "@nestjs/graphql";
import { ContextualGraphqlRequest } from "../../index";
import File from "../../Core/Cdn/Entity/File";

@ObjectType()
export default class Photo {
    @Field(() => Int)
    id: number;

    @Field({ nullable: true })
    comment?: string | null;

    @Field(() => Int)
    yearId: number;

    @Field(() => Int)
    userId: number;

    @Field(() => File, { nullable: true })
    file?: File;

    @Field(() => Int, { nullable: true })
    imageFileId?: number | null;

    @Field(() => GraphQLISODateTime)
    createdAt: Date;

    @Field(() => GraphQLISODateTime)
    updatedAt: Date;

    context?: ContextualGraphqlRequest;
}
