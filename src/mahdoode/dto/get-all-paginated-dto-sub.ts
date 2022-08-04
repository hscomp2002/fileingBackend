import { IsArray, IsNumberString, IsOptional, IsString } from 'class-validator';

export default class GetAllPaginated {
  @IsNumberString()
  @IsOptional()
  public page: number;

  @IsNumberString()
  @IsOptional()
  public take: number;

  @IsString()
  @IsOptional()
  public name: string;

  @IsArray()
  @IsOptional()
  public mahdoode: string[];
}
