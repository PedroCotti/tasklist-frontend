require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importando o pacote CORS
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');

// Criando o app Express
const app = express();

// Usando o CORS para permitir requisições de origens diferentes
app.use(cors());

// Usando o body-parser para lidar com JSON
app.use(bodyParser.json());

// Conexão com o MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB!');
  })
  .catch(err => {
    console.log('Erro ao conectar ao MongoDB:', err);
  });

// Usando as rotas para tarefas
app.use('/api/tasks', taskRoutes);

// Servindo os arquivos estáticos do front-end se a aplicação for em produção
if (process.env.NODE_ENV === 'production') {
  // Definindo a pasta pública (onde os arquivos estáticos serão)
  app.use(express.static(path.join(__dirname, 'public')));

  // Serve o index.html quando o caminho for a raiz
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Porta para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


