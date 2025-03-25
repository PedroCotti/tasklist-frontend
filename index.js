require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importando o pacote CORS
const taskRoutes = require('./routes/taskRoutes');


// Criando o app Express
const app = express();

// Usando o CORS para permitir requisições de origens diferentes
app.use(cors());

// Usando o body-parser para lidar com JSON
app.use(bodyParser.json());

// Conexão com o MongoDB Atlas
const MONGO_URI = 'mongodb+srv://pedrocotti:E38C_ULisboa@TaskList.xsvbu.mongodb.net/TaskList?retryWrites=true&w=majority&appName=TaskList';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB!');
  })
  .catch(err => {
    console.log('Erro ao conectar ao MongoDB:', err);
  });

// Usando as rotas para tarefas
app.use('/api/tasks', taskRoutes);

// Porta para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

