const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://pedrocotti:<db_password>@tasklist.xsvbu.mongodb.net/?retryWrites=true&w=majority&appName=TaskList';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));
