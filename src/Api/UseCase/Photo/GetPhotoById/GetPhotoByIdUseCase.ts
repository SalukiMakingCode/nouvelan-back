import { ContextualGraphqlRequest, UseCase } from '../../../../index';
import { BadRequestException, Injectable } from "@nestjs/common";
import RequestEventEmitter from "../../../../Core/Event/Emitter/RequestEventEmitter";
import Photo from "../../../Entity/Photo";
import PhotoRepository from "../../../Repository/PhotoRepository";

@Injectable()
export default class GetPhotoByIdUseCase implements UseCase<Promise<Photo>, [id: number]> {
  constructor(
    private readonly eventEmitter: RequestEventEmitter,
    private readonly repository: PhotoRepository
  ) {}

  async handle(context: ContextualGraphqlRequest, id: number) {
    try {
      const file = await this.repository.getPhotoById(id);

      this.eventEmitter.emit('get_file_by_id_successfully', { context, id });

      return file;
    } catch (error) {
      this.eventEmitter.emit('get_file_by_id_failed', { context, id, error: error.message });

      throw new BadRequestException(error.message);
    }
  }
}
