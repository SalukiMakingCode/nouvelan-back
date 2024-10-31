import {ContextualGraphqlRequest, UseCase} from "../../../../index";
import Year from "../../../Entity/Year";
import YearRepository from "../../../Repository/YearRepository";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class GetYearByIdUseCase implements UseCase<Promise<Year>, [id: number]> {
    constructor(
        private readonly yearRepository: YearRepository,
    ) {
    }

    async handle(context: ContextualGraphqlRequest, id: number): Promise<Year> {
        return this.yearRepository.getYearById(id);
    }
}
