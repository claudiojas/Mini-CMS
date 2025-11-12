# Use uma imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependência
COPY package*.json ./
COPY prisma ./prisma/

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Gere o cliente Prisma
RUN npx prisma generate

# Exponha a porta que a aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
