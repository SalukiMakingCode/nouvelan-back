import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../Core/Datasource/Prisma";

@Injectable()
export default class YearRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async getAllYears() {
        return this.prisma.year.findMany();
    }

    async getYearById(id: number) {
        return this.prisma.year.findFirst({
            where: { id }
        });
    }

    async getCurrentYear() {
        return this.prisma.year.findFirst({
            where: { current: true }
        })
    }
}
