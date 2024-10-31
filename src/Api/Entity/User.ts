import {Field, GraphQLISODateTime, Int, ObjectType} from '@nestjs/graphql';
import {ContextualGraphqlRequest} from '../../index';

@ObjectType()
export default class User {
    @Field(() => Int)
    id: number;

    @Field()
    email: string;

    @Field()
    login: string;

    password: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    isParticipatingThisYear: boolean;

    @Field(() => GraphQLISODateTime)
    createdAt: Date;

    @Field(() => GraphQLISODateTime)
    updatedAt: Date;

    context?: ContextualGraphqlRequest;
}
