import { Injectable } from '@nestjs/common';
import { CreateMahdoodeDetDto } from './dto/create-mahdoode_det.dto';
import { UpdateMahdoodeDetDto } from './dto/update-mahdoode_det.dto';

import { MahdoodeDet } from './entities/mahdoode_det.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetAllPaginated from './dto/get-all-paginated-dto';

@Injectable()
export class MahdoodeDetService {
  constructor(
    @InjectRepository(MahdoodeDet)
    private mahdoodeDetRepository: Repository<MahdoodeDet>,
  ) {}

  create(createMahdoodeDetDto: CreateMahdoodeDetDto) {
    return 'This action adds a new mahdoodeDet';
  }

  async findAll(query: GetAllPaginated) {
    const take = query.take || +process.env.PER_PAGE_COUNT;
    const skip = query.page - 1 || 0;

    const [result, total] = await this.mahdoodeDetRepository.findAndCount({
      order: { name: 'ASC' },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} mahdoodeDet`;
  }

  update(id: number, updateMahdoodeDetDto: UpdateMahdoodeDetDto) {
    return `This action updates a #${id} mahdoodeDet`;
  }

  remove(id: number) {
    return `This action removes a #${id} mahdoodeDet`;
  }
}
