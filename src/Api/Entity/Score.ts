import {Field, Int, ObjectType} from "@nestjs/graphql";
import User from "./User";
import Year from "./Year";

@ObjectType()
export default class Score {
    @Field(() => Int)
    id: number;

    @Field(() => User)
    user: User;

    @Field(() => Year)
    year: Year;

    @Field(() => Int)
    aperitif: number;

    @Field(() => Int)
    entreeFroide: number;

    @Field(() => Int)
    soupe: number;

    @Field(() => Int)
    entreeChaude: number;

    @Field(() => Int)
    sorbet: number;

    @Field(() => Int)
    plat: number;

    @Field(() => Int)
    dessert: number;
}