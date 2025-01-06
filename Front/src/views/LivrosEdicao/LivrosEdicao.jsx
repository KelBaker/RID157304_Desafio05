import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './index.scss';
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { useParams } from 'react-router-dom';
import { LivrosService } from '../../api/LivrosService';

const LivrosEdicao = () => {
  let { livroId } = useParams(); 

  const [livro, setLivro] = useState({
    id: '',
    titulo: '',
    numeroPaginas: '', 
    isbn: '',
    editora: '',
  });

  
  async function getLivro() {
    if (!livroId) {
      alert('ID do livro inválido!');
      return;
    }

    try {
      console.log('Buscando livro com ID:', livroId); 
      const { data } = await LivrosService.getLivro(livroId);

      console.log('Dados recebidos do backend:', data);
      
      setLivro({
        ...data,
        id: livroId,
        numeroPaginas: data.numeroPaginas ? String(data.numeroPaginas) : '', 
      });
    } catch (error) {
      handleError(error);
    }
  }

  
  async function editLivro(event) {
    event.preventDefault();

    
    if (isNaN(livro.numeroPaginas)) {
      alert("O número de páginas deve ser um valor numérico.");
      return;
    }

    const body = {
      titulo: livro.titulo,
      numeroPaginas: Number(livro.numeroPaginas),
      isbn: livro.isbn,
      editora: livro.editora,
    };

    if (livro.titulo && livro.numeroPaginas && livro.isbn && livro.editora) {
      try {
        console.log('Enviando atualização do livro:', body);
        const { data } = await LivrosService.updateLivro(livroId, body);

        const mensagem = data?.mensagem || 'Livro atualizado com sucesso!';
        alert(mensagem); 
      } catch (error) {
        handleError(error);
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  
  const handleError = (error) => {
    if (error.response) {
      console.error('Erro ao processar a requisição:', error.response);
      alert(`Erro no servidor: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error('Erro ao processar a requisição (sem resposta):', error.request);
      alert('Erro no servidor. Não houve resposta.');
    } else {
      console.error('Erro desconhecido:', error.message);
      alert(`Erro desconhecido: ${error.message}`);
    }
  };

  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setLivro((prevLivro) => ({
      ...prevLivro,
      [name]: name === 'numeroPaginas' ? String(value) : value, 
    }));
  };

  
  useEffect(() => {
    getLivro(); 
  }, [livroId]);

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Edição de Livros</h1>
        <div>
          <form onSubmit={editLivro}>
            <div className="form-group">
              <label>Id</label>
              <input
                type="text"
                disabled
                required
                name="id"
                value={livro.id || ''}
              />
            </div>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                required
                name="titulo"
                value={livro.titulo || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                name="numeroPaginas"
                value={livro.numeroPaginas !== undefined ? livro.numeroPaginas : ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                name="isbn"
                value={livro.isbn || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                name="editora"
                value={livro.editora || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button type="submit">Atualizar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
