import {Query, Resolver} from "@nestjs/graphql";
import Year from "../Entity/Year";
import UseCaseFactory from "../UseCase/UseCaseFactory";
import {UseGuards} from "@nestjs/common";
import GraphqlAuthGuard from "../../Core/Security/Guard/GraphqlAuthGuard";
import {ContextualRequest} from "../../Core/Decorator/ContextualRequest";
import {ContextualGraphqlRequest} from "../../index";
import GetAllYearsUseCase from "../UseCase/Year/GetAllYears/GetAllYearsUseCase";

@Resolver(Year)
export default class YearResolver {
    constructor(
        private readonly serviceFactory: UseCaseFactory,
    ) {}

    @UseGuards(GraphqlAuthGuard)
    @Query(() => [Year])
    async getAllYears(@ContextualRequest() context: ContextualGraphqlRequest) {
        return (await this.serviceFactory.create(GetAllYearsUseCase)).handle(context);
    }
}
