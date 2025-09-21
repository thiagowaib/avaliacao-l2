import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';
import { CriarPedidosDto } from './dto/criar-pedidos.dto';

describe('Testes - PedidosService', () => {
  let service: PedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosService],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
  });

  it('deve retornar caixa_id null quando o produto não cabe em nenhuma caixa', () => {
    const input: CriarPedidosDto = {
      pedidos: [
        {
          pedido_id: 1,
          produtos: [
            { produto_id: 'ProdutoGigante', dimensoes: { altura: 200, largura: 200, comprimento: 200 } },
          ],
        },
      ],
    };

    const result = service.empacotarPedidos(input);
    const caixa = result.pedidos[0].caixas[0];

    expect(caixa.caixa_id).toBeNull();
    expect(caixa.produtos).toEqual(['ProdutoGigante']);
    expect(caixa.observacao).toBe('Produto não cabe em nenhuma caixa disponível.');
  });

  it('deve empacotar um único produto em uma caixa adequada', () => {
    const input: CriarPedidosDto = {
      pedidos: [
        {
          pedido_id: 2,
          produtos: [
            { produto_id: 'Headset', dimensoes: { altura: 25, largura: 15, comprimento: 20 } },
          ],
        },
      ],
    };

    const result = service.empacotarPedidos(input);
    const caixa = result.pedidos[0].caixas[0];

    expect(caixa.caixa_id).toBeDefined();
    expect(caixa.produtos).toEqual(['Headset']);
  });

  it('deve empacotar múltiplos produtos pequenos em caixas separadas se necessário', () => {
    const input: CriarPedidosDto = {
      pedidos: [
        {
          pedido_id: 3,
          produtos: [
            { produto_id: 'Mouse', dimensoes: { altura: 5, largura: 5, comprimento: 5 } },
            { produto_id: 'Teclado', dimensoes: { altura: 4, largura: 45, comprimento: 15 } },
            { produto_id: 'Livro', dimensoes: { altura: 2, largura: 20, comprimento: 25 } },
          ],
        },
      ],
    };

    const result = service.empacotarPedidos(input);
    const caixas = result.pedidos[0].caixas;

    // Pelo menos uma caixa deve conter produtos
    expect(caixas.length).toBeGreaterThanOrEqual(1);

    // Todos os produtos foram empacotados
    const todosProdutos = caixas.flatMap(c => c.produtos);
    expect(todosProdutos).toEqual(expect.arrayContaining(['Mouse', 'Teclado', 'Livro']));
  });

  it('deve empacotar vários pedidos ao mesmo tempo', () => {
    const input: CriarPedidosDto = {
      pedidos: [
        {
          pedido_id: 4,
          produtos: [
            { produto_id: 'ProdutoA', dimensoes: { altura: 10, largura: 10, comprimento: 10 } },
          ],
        },
        {
          pedido_id: 5,
          produtos: [
            { produto_id: 'ProdutoB', dimensoes: { altura: 40, largura: 40, comprimento: 40 } },
          ],
        },
      ],
    };

    const result = service.empacotarPedidos(input);
    expect(result.pedidos.length).toBe(2);
    expect(result.pedidos[0].caixas[0].produtos).toEqual(['ProdutoA']);
    expect(result.pedidos[1].caixas[0].produtos).toEqual(['ProdutoB']);
  });
});
