import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()

export default class SetCurrentScoreByActivityDto {
    @Field(() => Int)
    userId: number;
    @Field(() => Int)
    yearId: number;
    @Field(() => Int, {nullable: true})
    aperitif?: number;
    @Field(() => Int, {nullable: true})
    entreeFroide?: number;
    @Field(() => Int, {nullable: true})
    soupe?: number;
    @Field(() => Int, {nullable: true})
    entreeChaude?: number;
    @Field(() => Int, {nullable: true})
    sorbet?: number;
    @Field(() => Int, {nullable: true})
    plat?: number;
    @Field(() => Int, {nullable: true})
    dessert?: number;
}
