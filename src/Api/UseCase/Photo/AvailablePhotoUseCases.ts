import GetAllPhotoUseCase from "./GetAllPhoto/GetAllPhotoUseCase";
import SavePhotoUseCase from "./SavePhoto/SavePhotoUseCase";
import GetPhotoByIdUseCase from "./GetPhotoById/GetPhotoByIdUseCase";

export type AvailablePhotoUseCases = GetAllPhotoUseCase | SavePhotoUseCase | GetPhotoByIdUseCase;
