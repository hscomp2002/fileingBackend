import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { Md5 } from "md5-typescript";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const result = await this.customersRepository.findOne(username);
        if (result && result.user_pass === Md5.init(pass)) {
            //const { password, ...result } = result;
            return result;
        }
        return null;
    }
    async login(customer: Customer) {
        //const payload = { username: customer.user_login };
        return {
            access_token: "qqqqqqq12",
        };
    }
}
