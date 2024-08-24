# Use a imagem oficial do Node.js como base
FROM node:16

# Diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar os arquivos de dependências (apenas o package.json e package-lock.json)
COPY package*.json ./

# Instalar as dependências, utilizando --legacy-peer-deps para evitar conflitos
RUN npm install --legacy-peer-deps

# Para Debian/Ubuntu (se for base Debian):
RUN apt-get update && apt-get install -y postgresql-client

# Copiar o restante do código do projeto para dentro do contêiner
COPY . .

# Definir a variável de ambiente NODE_ENV como 'production' ou 'development'
ENV NODE_ENV=development



# Expor a porta 3000 para que a aplicação possa ser acessada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
