import {
  IsArray,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export default class GetAllPaginated {
  @IsNumberString()
  @IsOptional()
  public page: number;

  @IsNumberString()
  @IsOptional()
  public take: number;

  @IsString()
  @IsOptional()
  public mahdoode: string;

  @IsArray()
  //@IsIn(['1', '2'])
  @IsOptional()
  public type: string[];

  @IsNumberString()
  @IsOptional()
  public minGhimatkol: number;

  @IsNumberString()
  @IsOptional()
  public maxGhimatkol: number;

  @IsNumberString()
  @IsOptional()
  public minZirbana: number;

  @IsNumberString()
  @IsOptional()
  public maxZirbana: number;
}
