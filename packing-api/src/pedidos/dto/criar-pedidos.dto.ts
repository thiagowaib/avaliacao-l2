import { IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ProdutoDto } from './produto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PedidoInputDto {
  @ApiProperty({ description: 'ID do pedido', example: 1 })
  @IsNumber()
  pedido_id: number;

  @ApiProperty({ type: [ProdutoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}

export class CriarPedidosDto {
  @ApiProperty({ type: [PedidoInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoInputDto)
  pedidos: PedidoInputDto[];
}
