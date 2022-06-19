import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { Md5 } from 'md5-typescript';
import { JwtService } from '@nestjs/jwt';
import Login from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginInfo: Login): Promise<any> {
    const customer = await this.customersRepository.findOne({
      user_login: loginInfo.username,
    });
    if (customer && customer.user_pass === Md5.init(loginInfo.password)) {
      delete customer.user_pass;
      return customer;
    }
    return null;
  }
  async login(customer: Customer) {
    const payload = { username: customer.user_login, sub: customer.id };
    return this.jwtService.sign(payload);
  }
}
