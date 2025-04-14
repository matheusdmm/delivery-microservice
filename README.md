# 🛵 Microserviço de Pedidos - Delivery

Este é um microserviço para gerenciamento de pedidos de um sistema de delivery. Ele foi construído com as seguintes tecnologias:

- [Node.js](https://nodejs.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) (para GraphQL)
- [TypeScript](https://www.typescriptlang.org/)
- [DuckDB](https://duckdb.org/) (banco de dados embutido)
- [Vitest](https://vitest.dev/) (para testes automatizados)

---

## 🚀 Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as configurações necessárias:

```env
PORT=4000
DB_PATH=./db/delivery.duckdb
ENVIRONMENT=DEV
```

### 3. Rode o servidor

```bash
npm run dev
```

Isso vai iniciar o servidor GraphQL na porta configurada no `.env` (por padrão, `4000`).

### 4. Acesse o Playground GraphQL

Depois de rodar o servidor, acesse o [GraphQL Playground](http://localhost:4000/graphql) para testar as queries e mutations.

---

## 👻 2. Endpoints GraphQL

### **Mutation**: Criar Pedido

```graphql
mutation {
  createOrder(customer: "João da Silva", item: "Pizza Calabresa") {
    id
    customer
    item
    status
    created_at
  }
}
```

- **Resposta**:

```json
{
  "data": {
    "createOrder": {
      "id": 1,
      "customer": "João da Silva",
      "item": "Pizza Calabresa",
      "status": "PENDING",
      "created_at": "2025-04-14T00:00:00.000Z"
    }
  }
}
```

### **Query**: Listar Pedidos

```graphql
query {
  orders {
    id
    customer
    item
    status
    created_at
  }
}
```

- **Resposta**:

```json
{
  "data": {
    "orders": [
      {
        "id": 1,
        "customer": "João da Silva",
        "item": "Pizza Calabresa",
        "status": "PENDING",
        "created_at": "2025-04-14T00:00:00.000Z"
      }
    ]
  }
}
```

---

## 🧠 3. Estrutura do projeto

```
├── src/
│   ├── db/
│   │   └── duckdb.ts
│   ├── graphql/
│   │   ├── schema.ts
│   │   └── resolvers/
│   │       └── orders.ts
│   ├── server.ts
│   └── config/
│       └── env.ts
├── tests/
│   └── order.test.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🐤 4. Banco de dados (DuckDB)

O banco de dados é um arquivo `.db` salvo localmente, sem a necessidade de instalação separada de servidor. A conexão é feita através de:

```ts
import duckdb from 'duckdb';

const db = new duckdb.Database('database.db');
```

---

## 🧪 5. Testes Automatizados

O projeto utiliza [Vitest](https://vitest.dev/) para testes automatizados. Os testes estão localizados na pasta `tests/` e podem ser executados com:

```bash
npm test
```

Para rodar a interface de testes, utilize:

```bash
npm run test:ui
```

---

## 🛠️ 6. Configuração .env

O arquivo `.env` deve ser configurado para definir as variáveis de ambiente:

```env
PORT=4000
DB_PATH=./db/delivery.duckdb
ENVIRONMENT=DEV
```

---

## ✅ To-do

- [ ] Autenticação de usuários
- [ ] Integração com sistema de entregadores
- [x] Testes automatizados
- [ ] Deploy na Vercel/Render
