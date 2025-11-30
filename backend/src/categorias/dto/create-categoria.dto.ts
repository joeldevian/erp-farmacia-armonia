import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @MaxLength(255, { message: 'El nombre no puede exceder 255 caracteres' })
    nombre: string;

    @IsString({ message: 'La descripción debe ser un texto' })
    @IsOptional()
    descripcion?: string;

    @IsBoolean({ message: 'El estado debe ser verdadero o falso' })
    @IsOptional()
    estado?: boolean;
}
