import { Injectable } from '@nestjs/common';
import { CreateMahdoodeDto } from './dto/create-mahdoode.dto';
import { UpdateMahdoodeDto } from './dto/update-mahdoode.dto';
import { Mahdoode } from './entities/mahdoode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetAllPaginated from './dto/get-all-paginated-dto';

@Injectable()
export class MahdoodeService {
  constructor(
    @InjectRepository(Mahdoode)
    private mahdoodeRepository: Repository<Mahdoode>,
  ) {}

  create(createMahdoodeDto: CreateMahdoodeDto) {
    return 'This action adds a new mahdoode';
  }

  async findAll(query: GetAllPaginated) {
    const take = query.take || +process.env.PER_PAGE_COUNT;
    const skip = query.page - 1 || 0;

    const [result, total] = await this.mahdoodeRepository.findAndCount({
      join: {
        alias: 'mahdoode',
        leftJoinAndSelect: {
          mahdoode_dets: 'mahdoode.mahdoodeDets',
        },
      },
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
    return `This action returns a #${id} mahdoode`;
  }

  update(id: number, updateMahdoodeDto: UpdateMahdoodeDto) {
    return `This action updates a #${id} mahdoode`;
  }

  remove(id: number) {
    return `This action removes a #${id} mahdoode`;
  }
}
