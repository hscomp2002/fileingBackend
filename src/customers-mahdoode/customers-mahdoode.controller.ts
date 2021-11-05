import { Controller } from '@nestjs/common';
import { CustomersMahdoodeService } from './customers-mahdoode.service';

@Controller('customers-mahdoode')
export class CustomersMahdoodeController {
  constructor(private readonly customersMahdoodeService: CustomersMahdoodeService) {}
}
