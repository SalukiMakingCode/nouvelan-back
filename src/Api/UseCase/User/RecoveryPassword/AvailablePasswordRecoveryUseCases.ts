import RecoveryPasswordUseCase from './RecoverPassword/RecoverPasswordUseCase';
import ValidateRecoveryPasswordCodeUseCase from './ValidateRecoveryPasswordCode/ValidateRecoveryPasswordCodeUseCase';
import AskRecoveryPasswordCodeUseCase from "./AskRecoveryPasswordCode/AskRecoveryPasswordCodeUseCase";

export type AvailablePasswordRecoveryUseCases = AskRecoveryPasswordCodeUseCase
  | RecoveryPasswordUseCase
  | ValidateRecoveryPasswordCodeUseCase;
