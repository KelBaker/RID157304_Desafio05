const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/seuBancoDeDados');
    console.log('Conectado ao banco de dados');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados', error);
  }
};

module.exports = connection;
