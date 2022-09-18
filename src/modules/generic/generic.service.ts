import { NotFoundException } from '@nestjs/common';
import {
  DestroyOptions,
  FindOptions,
  IncludeOptions,
  UpdateOptions,
} from 'sequelize';
import { ResponseDTO } from './interfaces/response.interface';

export class GenericService<ModelClass, CreateDTO, UpdateDTO = undefined> {
  constructor(
    private model: any,
    private includes?: IncludeOptions | IncludeOptions[],
  ) {}

  //create an object in database
  async create(dto: CreateDTO): Promise<ResponseDTO<ModelClass>> {
    const obj = await this.model.create(dto);

    return {
      data: obj,
      success: true,
      message: `${this.model.name} created successfully`,
    };
  }

  //update an object in database
  async update(
    dto: CreateDTO | UpdateDTO,
    id?: number,
    where?: UpdateOptions,
  ): Promise<ResponseDTO<ModelClass>> {
    const obj = await this.model.findOne({
      where: {
        id,
      },
      ...where,
    });

    if (!obj) {
      throw new NotFoundException(`${this.model.name} not found!`);
    }

    await obj.update(dto);

    return {
      success: true,
      message: `${this.model.name} updated successfully`,
    };
  }

  // findAll records for matching query
  async findAll(query: FindOptions = {}): Promise<ResponseDTO<ModelClass[]>> {
    const data = await this.model.findAll({
      ...query,
      include: this.includes,
    });
    return { data, success: true };
  }

  /// find one record for matching query
  async findOne(
    id?: number,
    query?: FindOptions,
  ): Promise<ResponseDTO<ModelClass>> {
    const data = await this.model.findOne({
      where: {
        id,
      },
      ...query,
      include: this.includes,
    });

    if (!data) {
      throw new NotFoundException(`${this.model.name} not found!`);
    }

    return { data, success: true };
  }

  //delete records for matching query
  async delete(
    id?: number,
    query?: DestroyOptions,
  ): Promise<ResponseDTO<ModelClass>> {
    const obj = await this.model.findOne({
      where: {
        id,
      },
      ...query,
    });

    if (!obj) {
      throw new NotFoundException(`${this.model.name} not found!`);
    }

    await obj.destroy();

    return {
      success: true,
      message: `${this.model.name} deleted successfully`,
    };
  }
}
