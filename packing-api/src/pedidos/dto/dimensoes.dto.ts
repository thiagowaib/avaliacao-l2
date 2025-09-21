import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DimensoesDto {
  @ApiProperty({ description: 'Altura do produto', example: 40 })
  @IsNumber() @Min(1)
  altura: number;

  @ApiProperty({ description: 'Largura do produto', example: 10 })
  @IsNumber() @Min(1)
  largura: number;

  @ApiProperty({ description: 'Comprimento do produto', example: 25 })
  @IsNumber() @Min(1)
  comprimento: number;
}
