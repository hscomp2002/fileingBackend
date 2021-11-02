import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";

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

    @IsNumberString()
    @IsIn(["1", "2"])
    @IsOptional()
    public type: number;

    @IsNumberString()
    @IsOptional()
    public minPrice: number;

    @IsNumberString()
    @IsOptional()
    public maxPrice: number;

    @IsNumberString()
    @IsOptional()
    public minSenbana: number;

    @IsNumberString()
    @IsOptional()
    public maxSenbana: number;

}