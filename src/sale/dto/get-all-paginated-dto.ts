import { IsArray, IsNumberString, IsOptional } from 'class-validator';

export default class GetAllPaginated {
  @IsNumberString()
  @IsOptional()
  public page: number;

  @IsNumberString()
  @IsOptional()
  public take: number;

  @IsArray()
  public mahdoode: string[];

  @IsArray()
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

  @IsArray()
  @IsOptional()
  public tedadkhab: string[];

  @IsArray()
  @IsOptional()
  public tabaghe: string[];

  @IsArray()
  @IsOptional()
  public sanadtype: string[];

  @IsArray()
  @IsOptional()
  public senbana: string[];

  @IsArray()
  @IsOptional()
  public options: string[];
}
