import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDTO {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsOptional()
    parentId: number;

    @IsNumber()
    typeId: number;
};