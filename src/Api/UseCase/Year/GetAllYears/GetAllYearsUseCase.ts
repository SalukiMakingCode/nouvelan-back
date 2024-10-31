import {Injectable} from "@nestjs/common";
import {ContextualGraphqlRequest, UseCase} from "../../../../index";
import YearRepository from "../../../Repository/YearRepository";
import Year from "../../../Entity/Year";

@Injectable()
export default class GetAllYearsUseCase implements UseCase<Promise<Year[]>, []>{
    constructor(
        private readonly repository: YearRepository
    ) {}

    async handle(context: ContextualGraphqlRequest): Promise<Year[]> {
        return this.repository.getAllYears();
    }
}