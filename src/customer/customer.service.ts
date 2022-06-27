import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import GetAllPaginated from './dto/get-all-paginated-dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  async findAll(query: GetAllPaginated) {
    const take = query.take || +process.env.PER_PAGE_COUNT;
    const skip = query.page - 1 || 0;
    const keyword = query.keyword || '';

    const [result, total] = await this.customersRepository.findAndCount({
      where: { name: Like('%' + keyword + '%') },
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
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
