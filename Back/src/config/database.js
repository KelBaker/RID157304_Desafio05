const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/seu-banco-de-dados');
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro de conexão:', error);
    throw error; 
  }
};

module.exports = connection;
