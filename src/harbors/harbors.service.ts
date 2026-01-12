import { Injectable } from '@nestjs/common';
import { CreateHarborDto, UpdateHarborDto } from './dto/harbor.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HarborsService {
  constructor(private prisma: PrismaService) {}

  create(createHarborDto: CreateHarborDto) {
    return this.prisma.harbor.create({
      data: createHarborDto,
    });
  }

  findAll() {
    return this.prisma.harbor.findMany();
  }

  findOne(id: number) {
    return this.prisma.harbor.findUnique({
      where: { id },
    });
  }

  update(id: number, updateHarborDto: UpdateHarborDto) {
    return this.prisma.harbor.update({
      where: { id },
      data: updateHarborDto,
    });
  }

  remove(id: number) {
    return this.prisma.harbor.delete({
      where: { id },
    });
  }
}
