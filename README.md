# 🛵 Microserviço de Pedidos - Delivery

Microserviço para gerenciamento de pedidos de delivery.

- [Node.js](https://nodejs.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) (para GraphQL)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/) (banco de dados e autenticação)
- [React](https://react.dev/) no front-end
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [shadcn/ui](https://ui.shadcn.dev/) para componentes de interface
- [Vitest](https://vitest.dev/) para testes automatizados

---

## 🚀 Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto backend com as seguintes variáveis:

```env
PORT=4000
SUPABASE_URL=https://<seu-supabase-url>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<sua-service-role-key>
ENVIRONMENT=DEV
```

**Obs**: Você precisa criar o projeto no Supabase e configurar a tabela `orders`.

Tabela `orders`:

```sql
create table orders (
  id uuid primary key default uuid_generate_v4(),
  customer text not null,
  items jsonb not null,
  status text default 'pendente',
  created_at timestamp with time zone default now()
);
```

---

### 3. Rode o servidor backend

```bash
npm run dev
```

O servidor GraphQL ficará acessível em [http://localhost:4000/graphql](http://localhost:4000/graphql).

---

### 4. Rode o projeto front-end (React)

Entre na pasta do front-end e execute:

```bash
npm run dev
```

---

## 👻 Endpoints GraphQL

### **Mutation**: Criar Pedido

```graphql
mutation {
  createOrder(
    input: {
      customer: "test@test.com"
      items: [
        {
          name: "Pizza"
          quantity: 1
          size: "Grande"
          flavors: ["Calabresa", "Chocolate"]
        }
      ]
    }
  ) {
    id
    customer
    status
    created_at
  }
}
```

---

### **Query**: Listar Pedidos do Usuário

```graphql
query {
  myOrders {
    id
    customer
    items {
      name
      quantity
      size
      flavors
    }
    status
    created_at
  }
}
```

Essa query retorna **apenas** os pedidos do usuário autenticado (baseado no token JWT do Supabase).

---

## 🧠 Estrutura do Projeto

```
├── backend/
│   ├── src/
│   │   ├── graphql/
│   │   │   ├── resolvers/
│   │   │   │   └── orders.ts
│   │   │   │   └── users.ts
│   │   │   └── typedefs.ts
│   │   ├── database/
│   │   │   └── supabase.ts
│   │   ├── types/
│   │   │   └── types.ts
│   │   └── server.ts
│   ├── tests/
│   │   ├── createUsers.test.ts
│   │   ├── order.test.ts
│   │   └── queries.graphql
│   ├── .env
│   └── package.json
└── README.md
```

---

## 🧪 Testes Automatizados

O projeto backend utiliza [Vitest](https://vitest.dev/) para testes automatizados.

Para rodar os testes:

```bash
npm run test
```

---

## ✅ To-do

- [x] Autenticação de usuários com Supabase
- [x] Criação de pedidos
- [x] Listagem de pedidos do usuário autenticado
- [ ] Filtrar pedidos por status
- [ ] Paginação e ordenação de pedidos
- [ ] Integração com entregadores
