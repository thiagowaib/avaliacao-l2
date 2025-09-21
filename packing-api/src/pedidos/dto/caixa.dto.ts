import { IsString, IsArray, IsOptional } from 'class-validator';

export class CaixaDto {
  @IsOptional()
  @IsString()
  caixa_id: string | null;

  @IsArray()
  produtos: string[];

  @IsOptional()
  @IsString()
  observacao?: string;
}
