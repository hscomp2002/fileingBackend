import { IsNumberString, IsOptional } from "class-validator";

export default class GetAllPaginated {
    @IsNumberString()
    @IsOptional()
    public skip:number;

    @IsNumberString()
    @IsOptional()
    public take: number;

    @IsNumberString()
    @IsOptional()
    public mahdoode: string;

    @IsNumberString()
    @IsOptional()
    public type: number;

    @IsNumberString()
    @IsOptional()
    public minPrice:number;

    @IsNumberString()
    @IsOptional()
    public maxPrice:number;

    @IsNumberString()
    @IsOptional()
    public minArea:number;

    @IsNumberString()
    @IsOptional()
    public maxArea:number;

    @IsNumberString()
    @IsOptional()
    public senbana:number

}