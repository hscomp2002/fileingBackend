import {  IsNumberString, IsOptional, IsPositive } from "class-validator";

export default class GetAllPaginated {
    @IsNumberString()
    @IsOptional()
    public page: number;

    @IsNumberString()
    @IsOptional()
    public take: number;

    @IsOptional()
    public keyword: string;
}