import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsOptional,
    IsUrl,
    Length,
    Matches,
} from 'class-validator';

export class CreateProveedorDto {
    @IsString()
    @IsNotEmpty({ message: 'La razón social es requerida' })
    razon_social: string;

    @IsString()
    @IsNotEmpty({ message: 'El nombre comercial es requerido' })
    nombre_comercial: string;

    @IsString()
    @Length(11, 11, { message: 'El RUC debe tener exactamente 11 dígitos' })
    @Matches(/^\d{11}$/, { message: 'El RUC debe contener solo números' })
    ruc: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsEmail({}, { message: 'El email debe ser válido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'La dirección es requerida' })
    direccion: string;

    @IsUrl({}, { message: 'La página web debe ser una URL válida' })
    @IsOptional()
    pagina_web?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;
}
