import {ContextualGraphqlRequest, UseCase} from "../../../../index";
import User from "../../../Entity/User";
import UserRepository from "../../../Repository/UserRepository";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class GetUserByIdUseCase implements UseCase<Promise<User>, [id: number]> {
    constructor(
        private readonly userRepository: UserRepository,
    ) {
    }

    async handle(context: ContextualGraphqlRequest, id: number): Promise<User> {
        return this.userRepository.findById(id);
    }
}
