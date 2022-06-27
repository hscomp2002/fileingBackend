import { PartialType } from '@nestjs/mapped-types';
import { CreateMahdoodeDto } from './create-mahdoode.dto';

export class UpdateMahdoodeDto extends PartialType(CreateMahdoodeDto) {}
