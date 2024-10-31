import {Injectable} from "@nestjs/common";
import PhotoRepository from "../../../Repository/PhotoRepository";
import {ContextualGraphqlRequest} from "../../../../index";
import Photo from "../../../Entity/Photo";

@Injectable()
export default class GetAllPhotoUseCase {
    constructor(
        private readonly repository: PhotoRepository
    ) {
    }

    async handle(context: ContextualGraphqlRequest): Promise<Photo[]> {
        return this.repository.getAllPhotos();
    }
}
