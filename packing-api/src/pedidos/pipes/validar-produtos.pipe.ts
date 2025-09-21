import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CriarPedidosDto, PedidoInputDto } from '../dto/criar-pedidos.dto';

@Injectable()
export class ValidarProdutosPipe implements PipeTransform {
  transform(value: CriarPedidosDto): CriarPedidosDto {
    if (!value || !value.pedidos) {
      throw new BadRequestException('Estrutura de pedidos inválida.');
    }

    const pedidosFiltrados: PedidoInputDto[] = value.pedidos.map(pedido => {
      const produtosValidos = pedido.produtos.filter(p => {
        const { altura, largura, comprimento } = p.dimensoes;
        // Todas dimensões devem ser positivas
        return altura > 0 && largura > 0 && comprimento > 0;
      });

      if (produtosValidos.length === 0) {
        throw new BadRequestException(`Todos os produtos do pedido ${pedido.pedido_id} são inválidos.`);
      }

      return {
        ...pedido,
        produtos: produtosValidos,
      };
    });

    return { pedidos: pedidosFiltrados };
  }
}
