export class CaixaModel {
  id: number;
  height: number;
  width: number;
  length: number;

  constructor(id: number, height: number, width: number, length: number) {
    this.id = id;
    this.height = height;
    this.width = width;
    this.length = length;
  }

  cabeProduto(produto: { altura: number; largura: number; comprimento: number }): boolean {
    return (
      produto.altura <= this.height &&
      produto.largura <= this.width &&
      produto.comprimento <= this.length
    );
  }
}
