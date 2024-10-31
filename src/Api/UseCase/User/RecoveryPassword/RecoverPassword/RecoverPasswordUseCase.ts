import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import RequestEventEmitter from '../../../../../Core/Event/Emitter/RequestEventEmitter';
import { ContextualGraphqlRequest, UseCase } from '../../../../../index';
import UserRecoveryPassword from '../../../../Entity/UserRecoveryPassword';
import UserRecoveryPasswordRepository from '../../../../Repository/UserRecoveryPasswordRepository';
import UserRepository from '../../../../Repository/UserRepository';
import RecoverPasswordDto from './RecoverPasswordDto';
import RecoveryPasswordValidator from "../../../../Utils/RecoveryPasswordValidator";

@Injectable()
export default class RecoverPasswordUseCase
  implements UseCase<Promise<UserRecoveryPassword>, [dto: RecoverPasswordDto]> {
  constructor(
    private readonly recoveryPasswordRepository: UserRecoveryPasswordRepository,
    private readonly recoveryPasswordValidator: RecoveryPasswordValidator,
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: RequestEventEmitter
  ) {}

  async handle(context: ContextualGraphqlRequest, dto: RecoverPasswordDto) {
    try {
      if (dto.email === '') {
        throw new NotFoundException('Email not provided');
      }

      if (dto.password === '') {
        throw new NotFoundException('Password not provided');
      }

      const user = await this.userRepository.findByEmail(dto.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const recoveryPassword = await this.recoveryPasswordRepository.findByUserAndCode(user.id, dto.code);
      this.recoveryPasswordValidator.validate(recoveryPassword);
      const updatedRecoveryPassword = await this.recoveryPasswordRepository.markAsUsed(recoveryPassword.id);
      await this.userRepository.resetPassword(user.id, dto.password);

      return updatedRecoveryPassword;
    } catch (error) {
      this.eventEmitter.emit('RecoverPassword::failed', { context, error: error.message });

      throw new BadRequestException(error.message);
    }
  }
}
