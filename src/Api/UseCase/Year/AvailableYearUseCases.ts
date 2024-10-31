import GetAllYearsUseCase from "./GetAllYears/GetAllYearsUseCase";
import GetYearByIdUseCase from "./GetYearById/GetYearByIdUseCase";

export type AvailableYearUseCases = GetAllYearsUseCase | GetYearByIdUseCase;
