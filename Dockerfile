# Usar a imagem do Node.js como base
FROM node:16

# Diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalar as dependências do projeto, ignorando conflitos de dependência
RUN npm install --legacy-peer-deps

# Copiar todo o código do projeto para o contêiner
COPY . .

# Expor a porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
