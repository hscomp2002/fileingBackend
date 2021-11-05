import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetAllPaginated from './dto/get-all-paginated-dto';
import { Rent } from './entities/rent.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
  ) { }

  private parseQuery(query: GetAllPaginated): string {
    let where: string = "DATE(tarikh) >= DATE_SUB(now(), INTERVAL 6 MONTH)";
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

  async findAll(query:GetAllPaginated) {
    const take = query.take || +process.env.PER_PAGE_COUNT;
    const skip = query.page - 1 || 0;
    const where: string = this.parseQuery(query);

    const [data, count] = await this.rentRepository.createQueryBuilder("ejare_eft")
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
      count
    }
  }

}
