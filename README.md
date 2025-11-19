# Compra Certa - Hub de Ofertas

## Status do Projeto (Desenvolvimento)

- ✅ **Backend (`api-hub-link`):** 100% funcional. Todos os endpoints para autenticação e gerenciamento de produtos estão implementados e operacionais.
- ✅ **Painel Admin (`admin-hub`):** 100% funcional. O painel está totalmente integrado com o backend, permitindo login e o CRUD completo de produtos.
- ⏳ **Vitrine Pública (`frontend-publico`):** Em desenvolvimento. Próximo passo é conectar a vitrine à API para exibir os produtos aos usuários finais.

## Motivação

Muitos programas de afiliados, embora excelentes para monetização, não oferecem APIs robustas para listar e gerenciar produtos de forma programática. Isso cria um desafio para quem deseja construir uma experiência de curadoria de ofertas personalizada, ágil e eficiente.

O projeto **Compra Certa** nasceu para resolver exatamente esse problema. Em vez de depender de interfaces manuais e planilhas, construímos nosso próprio "Mini-CMS" (Sistema de Gerenciamento de Conteúdo) focado em marketing de afiliados.

## Para que Serve?

O Compra Certa é uma plataforma completa para a curadoria e divulgação de produtos com o melhor custo-benefício da internet. Ele é composto por três partes que trabalham em conjunto:

1.  **Painel Administrativo (`admin-hub`)**
    - Uma interface web privada onde a equipe do Compra Certa pode adicionar, editar, remover e destacar produtos.
    - É o centro de controle que alimenta todo o sistema, permitindo o gerenciamento completo das ofertas que serão apresentadas ao público.

2.  **Vitrine Pública (`frontend-publico`)**
    - O site que o público acessa. Ele exibe os produtos cadastrados no painel administrativo de forma organizada e atraente.
    - Os usuários podem buscar, filtrar por categorias e encontrar as melhores ofertas selecionadas pela nossa equipe.

3.  **API Central (`api-hub-link`)**
    - O cérebro do sistema. Esta API serve como ponte entre o painel administrativo e a vitrine pública.
    - Ela armazena todos os dados dos produtos em um banco de dados e fornece os endpoints necessários para que os outros dois sistemas consumam e manipulem essas informações.

Com essa arquitetura, temos total controle sobre os dados, a performance e a experiência do usuário, superando as limitações dos programas de afiliados e criando uma plataforma de ofertas verdadeiramente inteligente.

---

## Arquitetura e Deploy

A aplicação é implantada na [Vercel](https://vercel.com), utilizando uma arquitetura serverless e otimizada para monorepos.

### Estrutura na Vercel

O monorepo é configurado na Vercel importando cada um dos três aplicativos como um **projeto separado**:

1.  **`api-hub-link`**: O projeto da API, que roda como Vercel Functions.
2.  **`admin-hub`**: O projeto do painel administrativo (frontend).
3.  **`frontend-publico`**: O projeto da vitrine pública (frontend).

Essa abordagem permite que cada aplicação tenha seu próprio ciclo de deploy, domínio e variáveis de ambiente.

### Configurações Chave

#### 1. Migração do Banco de Dados (Prisma)

Para garantir que o banco de dados seja migrado automaticamente a cada deploy da API, o `apps/api-hub-link/package.json` contém um script `postbuild`:

```json
"scripts": {
  "build": "tsc",
  "postbuild": "npx prisma migrate deploy",
  "start": "node dist/server.js"
}
```

Para que este script funcione no ambiente da Vercel, o arquivo `turbo.json` na raiz do projeto foi configurado para expor a variável `DATABASE_URL` durante o build:

```json
{
  "globalEnv": ["DATABASE_URL"]
}
```

#### 2. Roteamento de Aplicações de Página Única (SPA)

Os frontends (`admin-hub` e `frontend-publico`) são SPAs feitas com React/Vite. Para que o roteamento de cliente funcione corretamente (evitando erros 404 ao recarregar a página), um arquivo `vercel.json` foi adicionado a cada um deles (`apps/admin-hub/vercel.json` e `apps/frontend-publico/vercel.json`) com a seguinte regra:

```json
{
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/index.html",
      "status": 200
    }
  ]
}
```

#### 3. Variáveis de Ambiente

As seguintes variáveis de ambiente precisam ser configuradas nos respectivos projetos na Vercel:

-   **Projeto `api-hub-link`**:
    -   `DATABASE_URL`: A string de conexão com o banco de dados PostgreSQL (ex: obtida do Neon, Supabase, ou Vercel Postgres).

-   **Projetos `admin-hub` e `frontend-publico`**:
    -   `VITE_API_BASE_URL`: A URL de produção da API implantada (ex: `https://sua-api.vercel.app`).
