import { PartialType } from '@nestjs/mapped-types';
import { CreateMahdoodeDetDto } from './create-mahdoode_det.dto';

export class UpdateMahdoodeDetDto extends PartialType(CreateMahdoodeDetDto) {}
