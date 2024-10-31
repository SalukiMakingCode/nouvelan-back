import {Injectable} from "@nestjs/common";
import ScoreRepository from "../../../Repository/ScoreRepository";
import {ContextualGraphqlRequest} from "../../../../index";
import Score from "../../../Entity/Score";

@Injectable()
export default class GetAllScoresCurrentUseCase {
    constructor(private readonly repository: ScoreRepository) {
    }

    async handle(context: ContextualGraphqlRequest): Promise<Score[]> {
        return this.repository.getAllScoresCurrent();
    }
}