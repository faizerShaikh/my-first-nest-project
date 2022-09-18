import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServiceInterface } from './interfaces/controller.interface';

export class GenericController<ModelClass, CreateDTO, UpdateDTO = undefined> {
  constructor(
    protected service: ServiceInterface<ModelClass, CreateDTO, UpdateDTO>,
  ) {}

  @Post()
  createObj(@Body() body: CreateDTO) {
    return this.service?.create(body);
  }

  @Get()
  getAllObj() {
    return this.service?.findAll();
  }

  @Put('/:id')
  updateObj(@Body() body: UpdateDTO | CreateDTO, @Param('id') id: string) {
    return this.service?.update(body, +id);
  }

  @Get('/:id')
  getOneObj(@Param('id') id: number) {
    return this.service?.findOne(+id);
  }

  @Delete('/:id')
  deleteObj(@Param('id') id: number) {
    return this.service?.delete(+id);
  }
}
