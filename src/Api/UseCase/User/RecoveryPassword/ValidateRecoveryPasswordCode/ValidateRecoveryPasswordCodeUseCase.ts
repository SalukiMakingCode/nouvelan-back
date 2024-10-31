import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import RequestEventEmitter from '../../../../../Core/Event/Emitter/RequestEventEmitter';
import { ContextualGraphqlRequest, UseCase } from '../../../../../index';
import UserRecoveryPassword from '../../../../Entity/UserRecoveryPassword';
import UserRecoveryPasswordRepository from '../../../../Repository/UserRecoveryPasswordRepository';
import UserRepository from '../../../../Repository/UserRepository';
import ValidateRecoveryPasswordCodeDto from './ValidateRecoveryPasswordCodeDto';
import RecoveryPasswordValidator from "../../../../Utils/RecoveryPasswordValidator";

@Injectable()
export default class ValidateRecoveryPasswordCodeUseCase
  implements UseCase<Promise<UserRecoveryPassword>, [dto: ValidateRecoveryPasswordCodeDto]> {
  constructor(
    private readonly recoveryPasswordRepository: UserRecoveryPasswordRepository,
    private readonly recoveryPasswordValidator: RecoveryPasswordValidator,
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: RequestEventEmitter
  ) {}

  async handle(context: ContextualGraphqlRequest, dto: ValidateRecoveryPasswordCodeDto) {
    try {
      if (dto.email === '') {
        throw new NotFoundException('E-mail not provided');
      }

      const user = await this.userRepository.findByEmail(dto.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const recoveryPassword = await this.recoveryPasswordRepository.findByUserAndCode(user.id, dto.code);

      this.recoveryPasswordValidator.validate(recoveryPassword);

      return recoveryPassword;
    } catch (error) {
      this.eventEmitter.emit('ValidateRecoveryPasswordCode::failed', { context, error: error.message });

      throw new BadRequestException(error.message);
    }
  }
}
