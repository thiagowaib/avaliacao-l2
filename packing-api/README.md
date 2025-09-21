# 📦 Packing API

![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![Coverage](https://img.shields.io/badge/Testes-Unitários-green)

**Packing API** é uma aplicação desenvolvida em **Node.js com NestJS** que automatiza o processo de embalagem de pedidos. A API recebe pedidos com produtos e suas dimensões (altura, largura, comprimento) e retorna a melhor forma de empacotar cada pedido em caixas de papelão, indicando quais produtos vão em cada caixa.

---

## 📦 Caixas Disponíveis

| Caixa | Altura (cm) | Largura (cm) | Comprimento (cm) |
| ----- | ----------- | ------------ | ---------------- |
| 1     | 30          | 40           | 80               |
| 2     | 50          | 50           | 40               |
| 3     | 50          | 80           | 60               |

---

## ⚙️ Funcionalidades Principais

* Empacotamento automático de pedidos em caixas de papelão.
* Validação de produtos com dimensões válidas.
* Swagger para documentação interativa da API.
* Autenticação via chave de api.
* Estrutura totalmente tipada com TypeScript.
* Testes unitários cobrindo principais casos de empacotamento.

---

## 🚀 Rodando o projeto com Docker

Na raiz do projeto:

1. **Build da imagem Docker:**

```bash
docker-compose build
```

2. **Subir o container:**

```bash
docker-compose up
```

* A API estará disponível em `http://localhost:3000`.
3. **Parar os containers:**

```bash
docker-compose down
```

> Observação: Caso encontre problemas de permissão, tente
executar os comandos em modo administrativo.

---

## 📝 Acessando o Swagger

* Swagger disponível em: `http://localhost:3000/swagger`
* Para ambiente de demonstração, pode ser utilizada para a chave `apikey`, o valor **avaliacao-l2**

---

## 🧪 Testes Unitários

A API possui testes unitários que cobrem alguns dos principais cenários de empacotamento.

Para rodar os testes:

```bash
npm install
npm run test
```

---

## 🔒 Segurança

* Autenticação via `apikey`.

---

## 💡 Observações

* A API **não considera rotação dos produtos**, simplificando a lógica de empacotamento.
* Produtos com dimensão zero ou negativa são **filtrados automaticamente** pelo Pipe de validação antes de chegar ao serviço.