const express = require('express');
const path = require('path');
const app = express();

// Definindo a pasta public como estática
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
