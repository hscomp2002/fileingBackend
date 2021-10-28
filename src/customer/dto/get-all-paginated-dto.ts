import { IsNumberString, IsOptional } from "class-validator";

export default class GetAllPaginated {
    @IsNumberString()
    @IsOptional()
    public skip:number;

    @IsNumberString()
    @IsOptional()
    public take: number;

    @IsOptional()
    public keyword: string;
}