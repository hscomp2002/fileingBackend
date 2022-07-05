import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetAllPaginated from './dto/get-all-paginated-dto';
import { Rent } from './entities/rent.entity';
import { Mahdoode } from '../mahdoode/entities/mahdoode.entity';
import { In } from 'typeorm';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
    @InjectRepository(Mahdoode)
    private mahdoodeRepository: Repository<Mahdoode>,
  ) {}

  private async parseQuery(query: GetAllPaginated): Promise<string> {
    let where = 'DATE(tarikh) >= DATE_SUB(now(), INTERVAL 6 MONTH)';
    if (query.mahdoode) {
      const mahdoode = await this.mahdoodeRepository.find({
        select: ['id', 'mahdoodeDets'],
        where: { id: In(query.mahdoode) },
      });
      let mahdoodeString = '';
      for (const i in mahdoode) {
        for (const j in mahdoode[i].mahdoodeDets) {
          mahdoodeString +=
            mahdoodeString === ''
              ? `'${mahdoode[i].mahdoodeDets[j].name}'`
              : `,'${mahdoode[i].mahdoodeDets[j].name}'`;
        }
      }
      where += ` AND mahdoode in (${mahdoodeString})`;
    }

    if (query.type) {
      where += ' AND `type`=' + query.type;
    }

    if (query.minRahn) {
      const minRahn =
        query.minRahn < +process.env.MILION_BELLION_BORDER
          ? +query.minRahn * 1000
          : query.minRahn;
      where += ` AND if(rahn<${+process.env
        .MILION_BELLION_BORDER} AND rahn>0,rahn*1000,rahn)>=${minRahn}`;
    }

    if (query.maxRahn) {
      const maxRahn =
        query.maxRahn < +process.env.MILION_BELLION_BORDER
          ? +query.maxRahn * 1000
          : query.maxRahn;
      where += ` AND if(rahn<${+process.env
        .MILION_BELLION_BORDER} AND rahn>0,rahn*1000,rahn)<=${maxRahn}`;
    }

    // if (query.minSenbana) {
    //   where += ` AND senbana >= ${query.minSenbana}`;
    // }

    // if (query.maxSenbana) {
    //   where += ` AND senbana <= ${query.maxSenbana}`;
    // }

    return where;
  }

  async findAll(query: GetAllPaginated) {
    const take = query.take || +process.env.PER_PAGE_COUNT;
    const skip = query.page - 1 || 0;
    const where: string = await this.parseQuery(query);

    const [data, count] = await this.rentRepository
      .createQueryBuilder('ejare_eft')
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();

    // console.log(this.rentRepository.createQueryBuilder("amlak_eft")
    // .where(where)
    // .skip(skip)
    // .take(take)
    // .getSql())
    return {
      data,
      pagination: {
        count,
        currentPage: skip + 1,
        lastPage: Math.ceil(count / take),
        perPage: take,
      },
    };
  }
}
