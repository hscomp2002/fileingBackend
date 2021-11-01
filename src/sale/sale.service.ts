import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import GetAllPaginated from './dto/get-all-paginated-dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) { }

  async findAll(query: GetAllPaginated) {
    const take = query.take || +process.env.PER_PAGE_COUNT;
    const skip = query.skip || 0;

    const mahdoode = query.mahdoode || '';
    const type = query.type || '';
    const minPrice = query.minPrice || 0;
    const maxPrice = query.maxPrice || 200000000000;
    const maxArea = query.maxArea || 1000000;
    const minArea = query.minArea || 0;
    const senbana = query.senbana || '';
    const [result, total] = await this.saleRepository.findAndCount(
      {
        where: { senbana: Like('%' + senbana + '%') },
        take: take,
        skip: skip
      }
    );

    return {
      data: result,
      count: total
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

}
