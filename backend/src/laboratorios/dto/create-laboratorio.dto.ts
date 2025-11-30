import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsEmail,
    Length,
    Matches,
} from 'class-validator';

export class CreateLaboratorioDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString()
    @Length(1, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' })
    nombre: string;

    @IsOptional()
    @IsString()
    direccion?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[0-9\-\s]+$/, {
        message: 'El teléfono debe contener solo números, guiones y espacios',
    })
    telefono?: string;

    @IsOptional()
    @IsEmail({}, { message: 'El correo debe ser válido' })
    correo?: string;

    @IsOptional()
    @IsString()
    @Length(11, 11, { message: 'El RUC debe tener exactamente 11 dígitos' })
    @Matches(/^[0-9]+$/, { message: 'El RUC debe contener solo números' })
    ruc?: string;
}
