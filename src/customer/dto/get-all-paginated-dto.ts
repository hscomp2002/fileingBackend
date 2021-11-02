import {  IsNumberString, IsOptional, IsPositive } from "class-validator";

export default class GetAllPaginated {
    @IsNumberString()
    @IsOptional()
    @IsPositive()
    public page: number;

    @IsNumberString()
    @IsOptional()
    @IsPositive()
    public take: number;

    @IsOptional()
    public keyword: string;
}