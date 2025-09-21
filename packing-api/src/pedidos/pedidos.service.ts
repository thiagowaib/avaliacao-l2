import { Injectable } from '@nestjs/common';
import { CaixaModel } from './models/caixa.model';
import { CriarPedidosDto } from './dto/criar-pedidos.dto';
import { PedidosRespostaDto, PedidoRespostaDto } from './dto/resposta-pedido.dto';
import { CaixaDto } from './dto/caixa.dto';

@Injectable()
export class PedidosService {
  private caixas: CaixaModel[] = [
    new CaixaModel(1, 30, 40, 80),
    new CaixaModel(2, 50, 50, 40),
    new CaixaModel(3, 50, 80, 60),
  ];

  empacotarPedidos(input: CriarPedidosDto): PedidosRespostaDto {
    const resposta: PedidoRespostaDto[] = input.pedidos.map(pedido => {
      const caixasDoPedido: CaixaDto[] = [];

      // Ordena caixas por volume crescente
      const caixasOrdenadas = [...this.caixas].sort(
        (a, b) => a.height * a.width * a.length - b.height * b.width * b.length
      );

      let produtosNaoEmpacotados = [...pedido.produtos];

      while (produtosNaoEmpacotados.length > 0) {
        let caixaEncontrada: CaixaModel | null = null;
        let produtosNaCaixa: string[] = [];

        for (const caixa of caixasOrdenadas) {
          const cabem: string[] = produtosNaoEmpacotados
            .filter(p => caixa.cabeProduto(p.dimensoes))
            .map(p => p.produto_id);

          if (cabem.length > 0) {
            caixaEncontrada = caixa;
            produtosNaCaixa = cabem;
            break;
          }
        }

        if (!caixaEncontrada) {
          // Nenhuma caixa disponível para o produto restante
          const produtoRestante = produtosNaoEmpacotados.shift()!;
          caixasDoPedido.push({
            caixa_id: null,
            produtos: [produtoRestante.produto_id],
            observacao: 'Produto não cabe em nenhuma caixa disponível.',
          });
        } else {
          // Remove os produtos que foram encaixados
          produtosNaoEmpacotados = produtosNaoEmpacotados.filter(p => !produtosNaCaixa.includes(p.produto_id));
          caixasDoPedido.push({
            caixa_id: `Caixa ${caixaEncontrada.id}`,
            produtos: produtosNaCaixa,
          });
        }
      }

      return {
        pedido_id: pedido.pedido_id,
        caixas: caixasDoPedido,
      };
    });

    return { pedidos: resposta };
  }
}
