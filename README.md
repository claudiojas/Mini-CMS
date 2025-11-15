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
