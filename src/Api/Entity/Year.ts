import {Field, Int, ObjectType} from "@nestjs/graphql";
import {ContextualGraphqlRequest} from "../../index";

@ObjectType()
export default class Year {
    @Field(() => Int)
    id: number;

    @Field()
    year: string;

    @Field()
    current: boolean;

    context?: ContextualGraphqlRequest;
}
