import GetAllScoreUseCase from "./GetAllScoreUseCase/GetAllScoreUseCase";
import SetCurrentScoreByActivityUseCase from "./SetCurrentScoreByActivityUseCase/SetCurrentScoreByActivityUseCase";
import GetAllScoresCurrentUseCase from "./GetAllScoresCurrentUseCase/GetAllScoresCurrentUseCase";

export type AvailableScoreUseCases = GetAllScoreUseCase | SetCurrentScoreByActivityUseCase | GetAllScoresCurrentUseCase;