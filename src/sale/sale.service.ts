import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Repository } from 'typeorm';
import GetAllPaginated from './dto/get-all-paginated-dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) { }

  private parseQuery(query: GetAllPaginated): string {
    let where: string = "1=1";
    if (query.mahdoode) {
      where += " AND mahdoode LIKE '%" + query.mahdoode + "%'";
    }

    if (query.type) {
      where += ' AND `type`=' + query.type;
    }

    if (query.minPrice) {
      const minPrice = query.minPrice < +process.env.MILION_BELLION_BORDER ? +query.minPrice * 1000 : query.minPrice
      where += ` AND if(ghimatkol<${+process.env.MILION_BELLION_BORDER} AND ghimatkol>0,ghimatkol*1000,ghimatkol)>=${minPrice}`;
    }

    if (query.maxPrice) {
      const maxPrice = query.maxPrice < +process.env.MILION_BELLION_BORDER ? +query.maxPrice * 1000 : query.maxPrice
      where += ` AND if(ghimatkol<${+process.env.MILION_BELLION_BORDER} AND ghimatkol>0,ghimatkol*1000,ghimatkol)<=${maxPrice}`;
    }

    if (query.minSenbana) {
      where += ` AND senbana >= ${query.minSenbana}`;
    }

    if (query.maxSenbana) {
      where += ` AND senbana <= ${query.maxSenbana}`;
    }

    return where;
  }

  async findAll(query: GetAllPaginated) {
    const take = query.take || +process.env.PER_PAGE_COUNT;
    const skip = query.page - 1 || 0;
    const where: string = this.parseQuery(query);

    const [data, count] = await this.saleRepository.createQueryBuilder("amlak_eft")
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();

    // console.log(this.saleRepository.createQueryBuilder("amlak_eft")
    // .where(where)
    // .skip(skip)
    // .take(take)
    // .getSql())
    return {
      data,
      count
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

}
