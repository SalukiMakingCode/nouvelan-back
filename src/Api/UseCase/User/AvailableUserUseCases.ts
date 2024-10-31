import GetLoggedUserUseCase from "./GetLoggedUser/GetLoggedUserUseCase";
import SaveUserUseCase from "./SaveUser/SaveUserUseCase";
import GetAllUserUseCase from "./getAllUser/GetAllUserUseCase";
import GetAllUserParticipateUseCase from "./getAllUserParticipate/GetAllUserParticipateUseCase";
import GetUserByIdUseCase from "./GetUserById/GetUserByIdUseCase";

export type AvailableUserUseCases =
  GetLoggedUserUseCase
  | SaveUserUseCase
  | GetAllUserUseCase
  | GetAllUserParticipateUseCase
  | GetUserByIdUseCase;
