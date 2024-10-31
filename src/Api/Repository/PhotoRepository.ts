import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../Core/Datasource/Prisma";
import { Prisma } from "@prisma/client";

@Injectable()
export default class PhotoRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAllPhotos() {
    return this.prisma.photo.findMany({
      include: {
        year: true,
        user: true,
        imageFile: { select: { uri: true } }
      }
    });
  }

  async getPhotoById(id: number) {
    return this.prisma.photo.findUnique({
      where: { id },
    })
  }

  async delete(id: number) {
    return this.prisma.photo.delete({
      where: { id }
    })
  }

  save(data: Prisma.XOR<Prisma.PhotoCreateInput, Prisma.PhotoUncheckedCreateInput> | Prisma.XOR<Prisma.PhotoUpdateInput, Prisma.PhotoUncheckedUpdateInput>) {
    if (!data.id) {
      return this.prisma.photo.create({ data: data as Prisma.XOR<Prisma.PhotoCreateInput, Prisma.PhotoUncheckedCreateInput> });
    }

    return this.prisma.photo.update({
      where: {
        id: data.id as number,
      },
      data: data as Prisma.XOR<Prisma.PhotoUpdateInput, Prisma.PhotoUncheckedUpdateInput>,
    });
  }
}
