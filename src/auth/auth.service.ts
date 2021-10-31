import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { Md5 } from "md5-typescript";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        let customer = await this.customersRepository.findOne({user_login:username});
        if (customer && customer.user_pass === Md5.init(pass)) {
            const { user_pass, ...result } = customer;
            return result;
        }
        return null;
    }
    async login(customer: any) {
        const payload = { username: customer.user_login, sub: customer.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
