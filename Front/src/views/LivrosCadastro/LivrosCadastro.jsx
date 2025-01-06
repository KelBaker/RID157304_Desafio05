import { useState } from 'react';
import Header from '../../components/Header/Header';
import './index.scss';
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { LivrosService } from '../../api/LivrosService';

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({
    id: '', 
    titulo: '',
    numeroPaginas: '', 
    isbn: '',
    editora: ''
  });

  
  async function createLivro(event) {
    event.preventDefault(); 

    
    if (isNaN(livro.numeroPaginas)) {
      alert("O número de páginas deve ser um valor numérico.");
      return;
    }

    
    const body = {
      titulo: livro.titulo,
      numeroPaginas: livro.numeroPaginas, 
      isbn: livro.isbn,
      editora: livro.editora,
    };

    console.log('Dados a serem enviados:', body); 

    if (livro.titulo && livro.numeroPaginas && livro.isbn && livro.editora) {
      try {
        const response = await LivrosService.createLivro(body);
        console.log('Resposta do servidor:', response); 
        alert("Livro cadastrado com sucesso!"); 
        document.getElementById('formulario').reset(); 
      } catch (error) {
        
        console.error('Erro ao cadastrar livro:', error);
        alert(`${error.response?.status} - ${error.response?.data}`);
      }
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value, 
    }));
  };

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario" onSubmit={createLivro}>
            <div className="form-group">
              <label>Id</label>
              <input
                type="text"
                name="id"
                disabled 
                value={livro.id} 
              />
            </div>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                name="titulo"
                required
                value={livro.titulo}
                onChange={handleChange}
                placeholder="Digite o título do livro" 
              />
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                name="numeroPaginas" 
                required
                value={livro.numeroPaginas} 
                onChange={handleChange}
                placeholder="Digite o número de páginas" 
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                name="isbn"
                required
                value={livro.isbn}
                onChange={handleChange}
                placeholder="Digite o ISBN do livro" 
              />
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                name="editora"
                required
                value={livro.editora}
                onChange={handleChange}
                placeholder="Digite o nome da editora" 
              />
            </div>
            <div className="form-group">
              <button type="submit">Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosCadastro;
