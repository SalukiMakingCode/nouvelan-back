import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import UserRecoveryPassword from '../Entity/UserRecoveryPassword';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import AskRecoveryPasswordCodeUseCase
  from "../UseCase/User/RecoveryPassword/AskRecoveryPasswordCode/AskRecoveryPasswordCodeUseCase";
import ValidateRecoveryPasswordCodeUseCase
  from "../UseCase/User/RecoveryPassword/ValidateRecoveryPasswordCode/ValidateRecoveryPasswordCodeUseCase";
import RecoveryPasswordUseCase from "../UseCase/User/RecoveryPassword/RecoverPassword/RecoverPasswordUseCase";
import ValidateRecoveryPasswordCodeDto
  from "../UseCase/User/RecoveryPassword/ValidateRecoveryPasswordCode/ValidateRecoveryPasswordCodeDto";
import RecoverPasswordDto from "../UseCase/User/RecoveryPassword/RecoverPassword/RecoverPasswordDto";

@Resolver(UserRecoveryPassword)
export default class UserRecoveryPasswordResolver {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Mutation(() => Boolean)
  async askRecoveryPasswordCode(@Args('email') email: string) {
    return (await this.useCaseFactory.create(AskRecoveryPasswordCodeUseCase)).handle(null, email);
  }

  @Query(() => UserRecoveryPassword)
  async validateRecoveryPasswordCode(@Args('dto') dto: ValidateRecoveryPasswordCodeDto) {
    return (await this.useCaseFactory.create(ValidateRecoveryPasswordCodeUseCase)).handle(null, dto);
  }

  @Mutation(() => UserRecoveryPassword)
  async recoverPassword(@Args('dto') dto: RecoverPasswordDto) {
    return (await this.useCaseFactory.create(RecoveryPasswordUseCase)).handle(null, dto);
  }
}
