import {Injectable} from '@nestjs/common';
import ServiceFactory from '../../Core/Factory/ServiceFactory';
import {AvailableUserUseCases} from "./User/AvailableUserUseCases";
import {AvailablePasswordRecoveryUseCases} from "./User/RecoveryPassword/AvailablePasswordRecoveryUseCases";
import {AvailableYearUseCases} from "./Year/AvailableYearUseCases";
import {AvailablePhotoUseCases} from "./Photo/AvailablePhotoUseCases";
import {AvailableScoreUseCases} from "./Score/AvailableScoreUseCases";
import GetOneFileUseCase from "./File/GetOneFile/GetOneFileUseCase";

type UseCases =
  AvailableUserUseCases
  | AvailablePasswordRecoveryUseCases
  | AvailableYearUseCases
  | AvailablePhotoUseCases
  | AvailableScoreUseCases
  | GetOneFileUseCase;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> {
}
