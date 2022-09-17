import { ResponseDTO } from './response.interface';

export interface ServiceInterface<M, CreateDTO, UpdateObj = undefined> {
  create(obj: CreateDTO): Promise<ResponseDTO<M>>;
  update(obj: CreateDTO | UpdateObj, id: number): Promise<ResponseDTO<M>>;
  findAll(): Promise<ResponseDTO<M[]>>;
  findOne(id: number): Promise<ResponseDTO<M>>;
  delete(id: number): Promise<ResponseDTO<M>>;
}
