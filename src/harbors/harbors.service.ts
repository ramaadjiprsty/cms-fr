import { Injectable } from '@nestjs/common';
import { CreateHarborDto } from './dto/harbor.dto';

@Injectable()
export class HarborsService {
  create(createHarborDto: CreateHarborDto) {
    return 'This action adds a new harbor';
  }

  findAll() {
    return `This action returns all harbors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} harbor`;
  }

  update(id: number, updateHarborDto: UpdateHarborDto) {
    return `This action updates a #${id} harbor`;
  }

  remove(id: number) {
    return `This action removes a #${id} harbor`;
  }
}
