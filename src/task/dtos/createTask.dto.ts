import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateTaskDTO {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    @IsOptional()
    parentId: number;

    @IsInt()
    typeId: number;
};