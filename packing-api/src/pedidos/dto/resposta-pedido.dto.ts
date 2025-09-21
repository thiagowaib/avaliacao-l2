import { IsArray, ValidateNested, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CaixaDto {
  @ApiProperty({ description: 'ID da caixa', example: 'Caixa 1', required: false, nullable: true })
  @IsOptional()
  @IsString()
  caixa_id: string | null;

  @ApiProperty({ description: 'Lista de produtos na caixa', example: ['PS5', 'Volante'] })
  @IsArray()
  produtos: string[];

  @ApiProperty({ description: 'Observação caso não caiba em nenhuma caixa', example: 'Produto não cabe em nenhuma caixa disponível.', required: false })
  @IsOptional()
  @IsString()
  observacao?: string;
}

export class PedidoRespostaDto {
  @ApiProperty({ description: 'ID do pedido', example: 1 })
  @IsNumber()
  pedido_id: number;

  @ApiProperty({ type: [CaixaDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CaixaDto)
  caixas: CaixaDto[];
}

export class PedidosRespostaDto {
  @ApiProperty({ type: [PedidoRespostaDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoRespostaDto)
  pedidos: PedidoRespostaDto[];
}
