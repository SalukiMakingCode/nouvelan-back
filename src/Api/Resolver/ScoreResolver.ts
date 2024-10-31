import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import Score from "../Entity/Score";
import UseCaseFactory from "../UseCase/UseCaseFactory";
import {UseGuards} from "@nestjs/common";
import GraphqlAuthGuard from "../../Core/Security/Guard/GraphqlAuthGuard";
import {ContextualRequest} from "../../Core/Decorator/ContextualRequest";
import {ContextualGraphqlRequest} from "../../index";
import GetAllScoreUseCase from "../UseCase/Score/GetAllScoreUseCase/GetAllScoreUseCase";
import SetCurrentScoreByActivityDto
    from "../UseCase/Score/SetCurrentScoreByActivityUseCase/SetCurrentScoreByActivityDto";
import SetCurrentScoreByActivityUseCase
    from "../UseCase/Score/SetCurrentScoreByActivityUseCase/SetCurrentScoreByActivityUseCase";
import GetAllScoresCurrentUseCase from "../UseCase/Score/GetAllScoresCurrentUseCase/GetAllScoresCurrentUseCase";

@Resolver(Score)
export default class ScoreResolver {
    constructor(
        private readonly serviceFactory: UseCaseFactory
    ) {
    }

    @UseGuards(GraphqlAuthGuard)
    @Query(() => [Score])
    async getAllScores(@ContextualRequest() context: ContextualGraphqlRequest) {
        return (await this.serviceFactory.create(GetAllScoreUseCase)).handle(context);
    }

    
    @UseGuards(GraphqlAuthGuard)
    @Query(() => [Score])
    async getAllScoresCurrent(@ContextualRequest() context: ContextualGraphqlRequest) {
        return (await this.serviceFactory.create(GetAllScoresCurrentUseCase)).handle(context);
    }


    @UseGuards(GraphqlAuthGuard)
    @Mutation(() => [Score])
    async setCurrentScoreByActivity(
        @ContextualRequest() context: ContextualGraphqlRequest,
        @Args({name: 'dto', type: () => [SetCurrentScoreByActivityDto]}) dto: SetCurrentScoreByActivityDto[]
    ): Promise<Score[]> {
        const useCase = await this.serviceFactory.create(SetCurrentScoreByActivityUseCase);
        const result = await useCase.handle(context, dto);

        if (!Array.isArray(result)) {
            throw new Error('Expected a list of Score[]');
        }

        return result;
    }
}
