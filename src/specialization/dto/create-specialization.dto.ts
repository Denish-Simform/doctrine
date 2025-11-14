import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSpecializationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
}
