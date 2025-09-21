import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DimensoesDto } from './dimensoes.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProdutoDto {
  @ApiProperty({ description: 'ID do produto', example: 'PS5' })
  @IsString()
  produto_id: string;

  @ApiProperty({ type: () => DimensoesDto })
  @ValidateNested()
  @Type(() => DimensoesDto)
  dimensoes: DimensoesDto;
}
