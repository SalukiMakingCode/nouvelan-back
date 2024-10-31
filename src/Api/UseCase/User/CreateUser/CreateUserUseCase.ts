import {BadRequestException, Injectable} from "@nestjs/common";
import SaveUserDto from "../SaveUser/SaveUserDto";
import User from "../../../Entity/User";
import { UncontextualUseCase } from "../../../../index";
import UserRepository from "../../../Repository/UserRepository";
import * as bcrypt from "bcrypt";

@Injectable()
export default class CreateUserUseCase implements UncontextualUseCase<Promise<User>, [dto: SaveUserDto]> {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async handle(dto: SaveUserDto): Promise<User> {
    try {
      const saltRounds = 10;
      dto.password = await bcrypt.hash(dto.password, saltRounds);

      return this.userRepository.saveUser(dto);
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
