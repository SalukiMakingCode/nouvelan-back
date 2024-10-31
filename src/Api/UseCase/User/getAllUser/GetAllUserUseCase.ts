import {Injectable} from "@nestjs/common";
import {ContextualGraphqlRequest, UseCase} from "../../../../index";
import User from "../../../Entity/User";
import UserRepository from "../../../Repository/UserRepository";

@Injectable()
export default class GetAllUserUseCase implements UseCase<Promise<User[]>, []> {
    constructor(
        private readonly repository: UserRepository
    ) {
    }

    async handle(context: ContextualGraphqlRequest): Promise<User[]> {
        return this.repository.findAll();
    }
}
