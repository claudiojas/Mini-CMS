# API Hub-Link

Esta é a API central do projeto Compra Certa. Ela é responsável por gerenciar usuários (admins), produtos e fornecer os dados para os frontends `admin-hub` e `frontend-publico`.

## Tecnologias

- **Runtime:** Node.js
- **Framework:** Express
- **Linguagem:** TypeScript
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JSON Web Tokens (JWT)
- **Containerização (BD):** Docker e Docker Compose

## Configuração

1.  **Variáveis de Ambiente:**
    - Crie um arquivo `.env` na raiz deste diretório (`apps/api-hub-link`).
    - Adicione as seguintes variáveis:
      ```env
      # Variáveis para o Docker Compose (usadas para criar o container do BD)
      POSTGRES_USER=user
      POSTGRES_PASSWORD=password
      POSTGRES_DB=mydb

      # URL de conexão para o Prisma se conectar ao banco de dados
      DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
      
      # Chave secreta para gerar os tokens JWT
      JWT_SECRET="sua-chave-super-secreta-e-segura"
      ```

## Como Rodar Localmente

1.  **Inicie o Banco de Dados:**
    - O serviço do PostgreSQL precisa estar rodando antes de iniciar a API.
    ```bash
    # A partir da raiz do monorepo (ex: /compraCerta)
    npm run docker:up --workspace=@compra-certa/api-hub-link
    ```

2.  **Execute a Migração do Banco de Dados (se for a primeira vez):**
    ```bash
    # A partir da raiz do monorepo
    npm run prisma:migrate --workspace=@compra-certa/api-hub-link
    ```

3.  **Inicie a API em Modo de Desenvolvimento:**
    ```bash
    # A partir da raiz do monorepo
    npm run dev -- --filter=@compra-certa/api-hub-link
    ```
    - A API estará disponível em `http://localhost:3000`.

## Endpoints da API

### Autenticação (`/auth`)

- `POST /auth/register`: Registra um novo usuário administrador.
  - **Body:** `{ "email": "...", "password": "..." }`
- `POST /auth/login`: Autentica um usuário e retorna um token JWT.
  - **Body:** `{ "email": "...", "password": "..." }`
  - **Resposta de Sucesso:** `{ "token": "..." }`

### Produtos (`/products`)

_As rotas `POST`, `PUT`, `DELETE` são protegidas e exigem um token JWT de autenticação._

- `GET /products`: Retorna uma lista de todos os produtos.
- `GET /products/featured`: Retorna uma lista de produtos marcados como destaque.
- `GET /products/category/:category`: Retorna produtos de uma categoria específica.
- `GET /products/slug/:slug`: Retorna um produto pelo seu slug.
- `GET /products/:id`: Retorna um produto pelo seu ID.
- `POST /products`: Cria um novo produto.
  - **Header:** `Authorization: Bearer <seu_token_jwt>`
  - **Body:** (Objeto do produto sem o `id`)
- `PUT /products/:id`: Atualiza um produto existente.
  - **Header:** `Authorization: Bearer <seu_token_jwt>`
  - **Body:** (Objeto do produto com os campos a serem atualizados)
- `DELETE /products/:id`: Deleta um produto.
  - **Header:** `Authorization: Bearer <seu_token_jwt>`
