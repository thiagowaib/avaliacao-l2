import { ValidarProdutosPipe } from './validar-produtos.pipe';
import { CriarPedidosDto } from '../dto/criar-pedidos.dto';
import { BadRequestException } from '@nestjs/common';

describe('Testes - ValidarProdutosPipe', () => {
  let pipe: ValidarProdutosPipe;

  beforeEach(() => {
    pipe = new ValidarProdutosPipe();
  });

  it('deve permitir produtos válidos', () => {
    const input: CriarPedidosDto = {
      pedidos: [
        {
          pedido_id: 1,
          produtos: [
            { produto_id: 'ProdutoValido', dimensoes: { altura: 10, largura: 10, comprimento: 10 } },
          ],
        },
      ],
    };

    const result = pipe.transform(input);
    expect(result.pedidos[0].produtos.length).toBe(1);
    expect(result.pedidos[0].produtos[0].produto_id).toBe('ProdutoValido');
  });

  it('deve remover produtos com dimensão zero ou negativa', () => {
    const input: CriarPedidosDto = {
      pedidos: [
        {
          pedido_id: 2,
          produtos: [
            { produto_id: 'ProdutoInválido', dimensoes: { altura: 0, largura: 5, comprimento: 5 } },
            { produto_id: 'ProdutoValido', dimensoes: { altura: 10, largura: 10, comprimento: 10 } },
          ],
        },
      ],
    };

    const result = pipe.transform(input);
    expect(result.pedidos[0].produtos.length).toBe(1);
    expect(result.pedidos[0].produtos[0].produto_id).toBe('ProdutoValido');
  });

  it('deve lançar BadRequestException se todos os produtos forem inválidos', () => {
    const input: CriarPedidosDto = {
      pedidos: [
        {
          pedido_id: 3,
          produtos: [
            { produto_id: 'Produto1', dimensoes: { altura: 0, largura: 5, comprimento: 5 } },
            { produto_id: 'Produto2', dimensoes: { altura: -1, largura: 10, comprimento: 10 } },
          ],
        },
      ],
    };

    expect(() => pipe.transform(input)).toThrow(BadRequestException);
  });

  it('deve lançar BadRequestException se estrutura do input estiver incorreta', () => {
    const input: any = { invalido: true };
    expect(() => pipe.transform(input)).toThrow(BadRequestException);
  });
});
