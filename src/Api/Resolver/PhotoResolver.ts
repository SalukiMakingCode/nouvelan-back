import {Args, Mutation, Query, ResolveField, Resolver} from "@nestjs/graphql";
import Photo from "../Entity/Photo";
import UseCaseFactory from "../UseCase/UseCaseFactory";
import {UseGuards} from "@nestjs/common";
import GraphqlAuthGuard from "../../Core/Security/Guard/GraphqlAuthGuard";
import {ContextualGraphqlRequest} from "../../index";
import GetAllPhotoUseCase from "../UseCase/Photo/GetAllPhoto/GetAllPhotoUseCase";
import {ContextualRequest} from "../../Core/Decorator/ContextualRequest";
import SavePhotoUseCase from "../UseCase/Photo/SavePhoto/SavePhotoUseCase";
import SavePhotoDto from "../UseCase/Photo/SavePhoto/SavePhotoDto";
import GetPhotoByIdUseCase from "../UseCase/Photo/GetPhotoById/GetPhotoByIdUseCase";
import Year from "../Entity/Year";
import GetYearByIdUseCase from "../UseCase/Year/GetYearById/GetYearByIdUseCase";
import GetOneFileUseCase from "../UseCase/File/GetOneFile/GetOneFileUseCase";
import File from "../../Core/Cdn/Entity/File";
import GetUserByIdUseCase from "../UseCase/User/GetUserById/GetUserByIdUseCase";
import User from "../Entity/User";

@Resolver(Photo)
export default class PhotoResolver {
    constructor(
        private readonly serviceFactory: UseCaseFactory
    ) {
    }

    @UseGuards(GraphqlAuthGuard)
    @Query(() => [Photo])
    async getAllPhotos(@ContextualRequest() context: ContextualGraphqlRequest) {
        return (await this.serviceFactory.create(GetAllPhotoUseCase)).handle(context);
    }

    @UseGuards(GraphqlAuthGuard)
    @Query(() => Photo)
    async getPhotoById(@ContextualRequest() context: ContextualGraphqlRequest, @Args('id') id: number) {
        return (await this.serviceFactory.create(GetPhotoByIdUseCase)).handle(context, id);
    }

    @UseGuards(GraphqlAuthGuard)
    @Mutation(() => Photo)
    async savePhoto(@ContextualRequest() context: ContextualGraphqlRequest, @Args('dto') dto: SavePhotoDto) {
        return (await this.serviceFactory.create(SavePhotoUseCase)).handle(context, dto);
    }

    @ResolveField(() => User)
    async user(photo: Photo) {
        return (await this.serviceFactory.create(GetUserByIdUseCase)).handle(photo.context, photo.userId);
    }

    @ResolveField(() => Year)
    async year(photo: Photo) {
        return (await this.serviceFactory.create(GetYearByIdUseCase)).handle(photo.context, photo.yearId);
    }

    @ResolveField(() => File)
    async image(photo: Photo) {
        return (await this.serviceFactory.create(GetOneFileUseCase)).handle(photo.context, photo.imageFileId);
    }
}
