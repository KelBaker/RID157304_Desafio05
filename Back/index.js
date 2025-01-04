const express = require('express');
const { livroModel } = require('./src/models/book'); 
const connection = require('./src/config/database'); 
const Counter = require('./src/models/counter'); 
const app = express();

app.use(express.json()); 


connection()
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao iniciar o servidor:', error);
  });


app.get('/livros', async (req, res) => {
  try {
    const livros = await livroModel.find(); 
    return res.status(200).json(livros); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar os livros', error: error.message });
  }
});


app.get('/livros/:id', async (req, res) => {
  try {
    const livro = await livroModel.findById(req.params.id); 
    if (livro) {
      return res.status(200).json(livro); 
    } else {
      return res.status(404).json({ message: 'Livro não encontrado' }); 
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar o livro', error: error.message });
  }
});


app.post('/livros', async (req, res) => {
  try {
    const { titulo, numeroPaginas, isbn, editora } = req.body;

    
    if (!titulo || !numeroPaginas || !isbn || !editora) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'livroId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    
    const novoLivro = new livroModel({ 
      _id: counter.seq, 
      titulo, 
      numeroPaginas, 
      isbn, 
      editora 
    });

    await novoLivro.save(); 
    return res.status(201).json(novoLivro); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao adicionar o livro', error: error.message });
  }
});


app.put('/livros/:id', async (req, res) => {
  try {
    const livroAtualizado = await livroModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (livroAtualizado) {
      return res.status(200).json(livroAtualizado); 
    } else {
      return res.status(404).json({ message: 'Livro não encontrado' }); 
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar o livro', error: error.message });
  }
});


app.delete('/livros/:id', async (req, res) => {
  try {
    const livroExcluido = await livroModel.findByIdAndDelete(req.params.id); 
    if (livroExcluido) {
      return res.status(200).json({ message: 'Livro excluído com sucesso' }); 
    } else {
      return res.status(404).json({ message: 'Livro não encontrado' }); 
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir o livro', error: error.message });
  }
});
