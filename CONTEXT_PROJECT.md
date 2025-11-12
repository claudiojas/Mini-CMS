# Documentação Técnica - Projeto Compra Certa

Este documento serve como um guia técnico completo para o desenvolvimento do projeto Compra Certa. Ele detalha a arquitetura, tecnologias, configuração do ambiente e o estado atual do desenvolvimento.

## 1. Status Atual do Projeto

O projeto está em **fase de desenvolvimento inicial**. A fundação da arquitetura está estabelecida, mas a lógica de negócios principal ainda precisa ser implementada.

**O que foi feito:**
- **Monorepo:** A estrutura do monorepo foi criada com **Turborepo** e **npm Workspaces**.
- **Serviços:** Os três serviços principais foram criados e estruturados dentro da pasta `apps`:
  - `@compra-certa/frontend-publico` (Vitrine para o cliente final)
  - `@compra-certa/admin-hub` (Painel de administração)
  - `@compra-certa/api-hub-link` (API central)
- **Backend (`api-hub-link`):**
  - Estrutura de pastas inicial criada (`src/{app,server,routes,...}`).
  - Tecnologias base instaladas (Express, TypeScript, Prisma, etc.).
  - Servidor Express básico implementado.
  - **Banco de Dados:**
    - Arquivos `Dockerfile` e `docker-compose.yml` criados para subir uma instância do **PostgreSQL**.
    - Schema do Prisma (`schema.prisma`) definido com os modelos `User` e `Product`.
    - Migração inicial do banco de dados foi criada e está pronta para ser executada.

**Próximos Passos:**
1.  Implementar os endpoints da API (CRUD para `Product` e autenticação para `User`).
2.  Conectar os frontends (`admin-hub` e `frontend-publico`) com a `api-hub-link`.
3.  Desenvolver a lógica de UI nos frontends para consumir os dados da API.

## 2. Arquitetura e Tecnologias

### 2.1. Visão Geral
- **Monorepo:** [Turborepo](https://turbo.build/repo)
- **Gerenciador de Pacotes:** [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

### 2.2. Frontend (`admin-hub` e `frontend-publico`)
- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)

### 2.3. Backend (`api-hub-link`)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Autenticação:** [JSON Web Tokens (JWT)](https://jwt.io/)
- **Containerização (BD):** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## 3. Como Configurar e Rodar o Ambiente

Siga os passos abaixo para configurar o ambiente de desenvolvimento completo.

### 3.1. Pré-requisitos
- Node.js (v18 ou superior)
- npm (v7 ou superior, para suporte a workspaces)
- Docker e Docker Compose

### 3.2. Configuração do Ambiente

1.  **Clone o Repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd compraCerta
    ```

2.  **Configure as Variáveis de Ambiente da API:**
    - Navegue até `apps/api-hub-link`.
    - O arquivo `.env` deve conter as seguintes variáveis para o Docker Compose e para o Prisma se conectarem ao banco de dados:
      ```env
      # Variáveis para o Docker Compose
      POSTGRES_USER=user
      POSTGRES_PASSWORD=password
      POSTGRES_DB=mydb

      # URL de conexão para o Prisma
      DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
      ```

3.  **Instale as Dependências:**
    - A partir da raiz do projeto (`compraCerta`), instale todas as dependências de todos os workspaces.
    ```bash
    npm install
    ```

### 3.3. Executando o Projeto

1.  **Inicie o Banco de Dados:**
    - O serviço do PostgreSQL precisa estar rodando antes de iniciar a API.
    ```bash
    # A partir da raiz do projeto
    npm run docker:up --workspace=@compra-certa/api-hub-link
    ```
    - *Aguarde alguns segundos para o banco de dados iniciar completamente.*

2.  **Execute a Migração do Banco de Dados:**
    - Este comando criará as tabelas `User` e `Product` no banco de dados.
    ```bash
    # A partir da raiz do projeto
    npm run prisma:migrate --workspace=@compra-certa/api-hub-link
    ```
    - Você só precisa rodar este comando na primeira vez ou quando houver alterações no `schema.prisma`.

3.  **Inicie todos os Serviços em Modo de Desenvolvimento:**
    - Este comando utiliza o Turborepo para iniciar os servidores de desenvolvimento do `admin-hub`, `frontend-publico` e `api-hub-link` simultaneamente.
    ```bash
    # A partir da raiz do projeto
    npm run dev
    ```
    - As aplicações estarão disponíveis em suas respectivas portas (verifique o console para as URLs).

## 4. Estrutura de Diretórios da API (`api-hub-link`)

A API segue uma arquitetura limpa para separação de responsabilidades.

- `src/`
  - `app.ts`: Onde a instância do Express é criada e configurada com middlewares.
  - `server.ts`: O ponto de entrada que efetivamente inicia o servidor HTTP.
  - `routes/`: Define os endpoints da API (ex: `/products`, `/login`). Cada arquivo de rota é responsável por um recurso.
  - `usecases/`: Contém a lógica de negócios principal. Cada caso de uso (ex: "criar um produto") é uma classe ou função separada.
  - `repositories/`: Abstrai o acesso aos dados. É a única camada que interage diretamente com o Prisma.
  - `interfaces/`: Define as interfaces e tipos TypeScript usados na aplicação.
