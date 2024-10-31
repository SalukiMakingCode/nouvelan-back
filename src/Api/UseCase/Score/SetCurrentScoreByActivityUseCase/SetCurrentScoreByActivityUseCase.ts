import {Injectable} from "@nestjs/common";
import ScoreRepository from "../../../Repository/ScoreRepository";
import {ContextualGraphqlRequest, UseCase} from "../../../../index";
import SetCurrentScoreByActivityDto from "./SetCurrentScoreByActivityDto";
import Score from "../../../Entity/Score";
import YearRepository from "../../../Repository/YearRepository";

@Injectable()
export default class SetCurrentScoreByActivityUseCase implements UseCase<Promise<Score[]>, [dto: SetCurrentScoreByActivityDto[]]> {
    constructor(
        private readonly repository: ScoreRepository,
        private readonly yearRepository: YearRepository
    ) {
    }

    async handle(context: ContextualGraphqlRequest, dto: SetCurrentScoreByActivityDto[]): Promise<Score[]> {
        const currentYear = await this.yearRepository.getCurrentYear();

        const dtoWithCurrentYear = dto.map(item => ({
            ...item,
            yearId: currentYear.id
        }));

        const scores = await this.repository.setCurrentScoreByActivity(dtoWithCurrentYear);

        if (!Array.isArray(scores)) {
            throw new Error('Expected an array of Score[]');
        }

        return scores;
    }
}
