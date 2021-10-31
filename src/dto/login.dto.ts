import { IsString } from "class-validator";

export default class Login {
   
    @IsString()
    public username: string;

    @IsString()
    public password: string;
}