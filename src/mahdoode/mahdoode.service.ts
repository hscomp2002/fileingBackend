import { Injectable } from '@nestjs/common';
import { CreateMahdoodeDto } from './dto/create-mahdoode.dto';
import { UpdateMahdoodeDto } from './dto/update-mahdoode.dto';
import { Mahdoode } from './entities/mahdoode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetAllPaginated from './dto/get-all-paginated-dto';
import GetAllPaginatedSub from './dto/get-all-paginated-dto-sub';
import { In } from 'typeorm';
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
      // join: {
      // alias: 'mahdoode',
      // leftJoinAndSelect: {
      //     mahdoode_dets: 'mahdoode.mahdoodeDets',
      // },
      // },
      order: {
        name: 'ASC',
      },
      take: take,
      skip: skip * take,
    });

    return { data: result, count: total };
  }

  async findSubMahdoode(query: GetAllPaginatedSub) {
    const out = [];
    let mahdoode: Mahdoode[] = [];
    if (query.mahdoode) {
      mahdoode = await this.mahdoodeRepository.find({
        where: {
          id: In(query.mahdoode),
        },
      });
    }
    for (const i in mahdoode) {
      for (const j in mahdoode[i].mahdoodeDets) {
        out.push({
          id: mahdoode[i].mahdoodeDets[j].id,
          name: mahdoode[i].mahdoodeDets[j].name,
        });
      }
    }
    return { data: out };
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
