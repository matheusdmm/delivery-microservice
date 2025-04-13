# 🛵 Microserviço de Pedidos - Delivery

Este é um microserviço simples para gerenciamento de pedidos de um sistema de delivery. Ele foi construído com:

- [Node.js](https://nodejs.org/)
- [Koa](https://koajs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [DuckDB](https://duckdb.org/) (como banco de dados embutido)

---

## 🚀 Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Rode

```bash
npm run dev
```

## 👻 2. Endpoints

### POST /pedidos

```json
{
  "cliente": "João da Silva",
  "itens": ["Pizza Calabresa", "Coca-Cola 2L"]
}
```

### GET /pedidos || /pedidos/:id

```json
{
  "id": "778f6921-8ddf-4365-be13-5c7785b56094",
  "cliente": "João Silvaaa",
  "itens": ["Pizza", "Refrigerante"],
  "status": "pendente"
}
```

### PATCH /pedidos/:id/status

```json
{
  "status": "em_preparo"
}
```

## 🧠 3. Estrutura do projeto

```
├── src/
│   ├── controllers/       # Lógica dos endpoints
│   ├── routes/            # Rotas do Koa
│   ├── services/          # Regras de negócio
│   ├── repositories/      # Acesso ao banco de dados (DuckDB)
│   ├── types/             # Tipagens do TypeScript
│   ├── db.ts              # Inicialização e conexão com o DuckDB
│   └── index.ts           # Ponto de entrada da aplicação
```

## 🐤 4. Banco de dados (DuckDB)

O banco é um arquivo `.db` salvo localmente (sem necessidade de instalação separada de servidor):

```ts
// src/db.ts
new duckdb.Database('database.db');
```

## 🛠️ 5. Configuração .env

```javascript
// É necessário configurar seu arquivo .env de acordo:
PORT=3000
DB_PATH=./db/delivery.duckdb
ENVIRONMENT=DEV
```

## ✅ To-do

- [ ] Autenticação de usuários
- [ ] Integração com sistema de entregadores
- [x] Testes automatizados
- [ ] Deploy na Vercel/Render
