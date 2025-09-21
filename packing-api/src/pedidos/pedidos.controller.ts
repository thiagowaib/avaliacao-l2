import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CriarPedidosDto } from './dto/criar-pedidos.dto';
import { PedidosRespostaDto } from './dto/resposta-pedido.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader, ApiBasicAuth } from '@nestjs/swagger';
import { ValidarProdutosPipe } from './pipes/validar-produtos.pipe';
import { ApiKeyGuard } from './guards/apikey.guard';

@Controller('pedidos')
@UseGuards(ApiKeyGuard)
@ApiTags('Pedidos')
@ApiHeader({name: 'apikey', description: 'Chave de Acesso à API', required: true})
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post('empacotar')
  @HttpCode(200)
  @ApiOperation({ summary: 'Empacota os produtos em caixas disponíveis' })
  @ApiBody({ type: CriarPedidosDto })
  @ApiResponse({ status: 200, description: 'Pedidos empacotados com sucesso', type: PedidosRespostaDto })
  @ApiResponse({ status: 403, description: 'API key inválida ou ausente' })
  empacotarPedidos(@Body(new ValidarProdutosPipe()) input: CriarPedidosDto): PedidosRespostaDto {
    return this.pedidosService.empacotarPedidos(input);
  }
}
