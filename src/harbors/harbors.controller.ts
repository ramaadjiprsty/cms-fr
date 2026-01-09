import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HarborsService } from './harbors.service';
import { CreateHarborDto, UpdateHarborDto } from './dto/harbor.dto';

@Controller('harbors')
export class HarborsController {
  constructor(private readonly harborsService: HarborsService) {}

  @Post()
  create(@Body() createHarborDto: CreateHarborDto) {
    return this.harborsService.create(createHarborDto);
  }

  @Get()
  findAll() {
    return this.harborsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.harborsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHarborDto: UpdateHarborDto) {
    return this.harborsService.update(+id, updateHarborDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.harborsService.remove(+id);
  }
}
