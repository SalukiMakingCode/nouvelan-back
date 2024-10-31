import { Injectable } from '@nestjs/common';
import ServiceFactory from '../../Factory/ServiceFactory';
import UploadFileUseCase from './UploadFile/UploadFileUseCase';

type AvailableUseCase = UploadFileUseCase;

@Injectable()
export default class FileUseCaseFactory extends ServiceFactory<AvailableUseCase> {}
