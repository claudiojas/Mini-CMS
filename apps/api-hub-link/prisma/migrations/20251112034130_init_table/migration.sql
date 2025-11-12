-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "titulo_exibicao" TEXT NOT NULL,
    "descricao_curta" TEXT NOT NULL,
    "url_imagem" TEXT NOT NULL,
    "link_afiliado_final" TEXT NOT NULL,
    "slug_personalizado" TEXT NOT NULL,
    "preco_exibicao" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "em_destaque" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_personalizado_key" ON "Product"("slug_personalizado");
