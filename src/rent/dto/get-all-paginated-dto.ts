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

  @IsArray()
  public mahdoode: string[];

  @IsArray()
  @IsOptional()
  public type: string[];

  @IsNumberString()
  @IsOptional()
  public minRahn: number;

  @IsNumberString()
  @IsOptional()
  public maxRahn: number;

  @IsNumberString()
  @IsOptional()
  public minEjare: number;

  @IsNumberString()
  @IsOptional()
  public maxEjare: number;

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
  public senbana: string[];

  @IsArray()
  @IsOptional()
  public options: string[];
}
