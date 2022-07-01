import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetAllPaginated from './dto/get-all-paginated-dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}

  private parseQuery(query: GetAllPaginated): string {
    let where = 'DATE(tarikh) >= DATE_SUB(now(), INTERVAL 6 MONTH)';
    if (query.mahdoode) {
      where += " AND mahdoode LIKE '%" + query.mahdoode + "%'";
    }

    if (query.minGhimatkol) {
      const minPrice =
        query.minGhimatkol < +process.env.MILION_BELLION_BORDER
          ? +query.minGhimatkol * 1000
          : query.minGhimatkol;
      where += ` AND if(ghimatkol<${+process.env
        .MILION_BELLION_BORDER} AND ghimatkol>0,ghimatkol*1000,ghimatkol)>=${minPrice}`;
    }

    if (query.maxGhimatkol) {
      const maxPrice =
        query.maxGhimatkol < +process.env.MILION_BELLION_BORDER
          ? +query.maxGhimatkol * 1000
          : query.maxGhimatkol;
      where += ` AND if(ghimatkol<${+process.env
        .MILION_BELLION_BORDER} AND ghimatkol>0,ghimatkol*1000,ghimatkol)<=${maxPrice}`;
    }

    if (query.minZirbana) {
      where += ` AND senbana >= ${query.minZirbana}`;
    }

    if (query.maxZirbana) {
      where += ` AND senbana <= ${query.maxZirbana}`;
    }

    if (query.type.length) {
      where += ' AND `type` in (' + query.type.join(',') + ')';
    }

    return where;
  }

  async findAll(query: GetAllPaginated) {
    const take: number = query.take || +process.env.PER_PAGE_COUNT;
    const skip: number = query.page - 1 || 0;
    const where: string = this.parseQuery(query);

    const [data, count] = await this.saleRepository
      .createQueryBuilder('amlak_eft')
      .where(where)
      .skip(skip)
      .take(take)
      .orderBy('amlak_eft.tarikh', 'DESC')
      .getManyAndCount();

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

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }
}
