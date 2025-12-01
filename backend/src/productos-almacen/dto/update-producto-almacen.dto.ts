import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoAlmacenDto } from './create-producto-almacen.dto';

export class UpdateProductoAlmacenDto extends PartialType(CreateProductoAlmacenDto) { }
