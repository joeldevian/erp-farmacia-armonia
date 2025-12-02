import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenCompraDetalleDto } from './create-orden-compra-detalle.dto';

export class UpdateOrdenCompraDetalleDto extends PartialType(
    CreateOrdenCompraDetalleDto,
) { }
