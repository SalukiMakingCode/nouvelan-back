import {Injectable} from "@nestjs/common";
import PhotoRepository from "../../../Repository/PhotoRepository";
import {ContextualGraphqlRequest, UseCase} from "../../../../index";
import Photo from "../../../Entity/Photo";
import SavePhotoDto from "./SavePhotoDto";
import YearRepository from "../../../Repository/YearRepository";

@Injectable()
export default class SavePhotoUseCase implements UseCase<Promise<Photo>, [dto: SavePhotoDto]> {
    constructor(
        private readonly repository: PhotoRepository,
        private readonly yearRepository: YearRepository
    ) {
    }

    async handle(context: ContextualGraphqlRequest, dto: SavePhotoDto): Promise<Photo> {
        return this.repository.save({
            ...(dto.id ? {id: dto.id} : {}),
            comment: dto.comment,
            imageFileId: dto.imageFileId,
            yearId: (await this.yearRepository.getCurrentYear()).id,
            userId: context.userId
        })
    }
}
