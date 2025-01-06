Este projeto é um sistema de cadastro e edição de livros. Ele permite que um usuário registre informações sobre livros, como título, número de páginas, ISBN e editora, tanto para adicionar novos livros quanto para editar ou excluir livros existentes.

Tecnologias Utilizadas
React: Biblioteca JavaScript para a construção da interface de usuário.
Axios: Para realizar requisições HTTP à API.
SCSS: Para estilização do projeto.
useState e useEffect: Para gerenciamento de estado e efeitos colaterais no React.
mongoDB banco de dados NoSQL

Funcionalidades
Cadastro de Livro:
O formulário de cadastro de livro permite que o usuário insira os seguintes dados:

Título: O título do livro.
Número de Páginas: O número total de páginas do livro.
ISBN: O código de barras único do livro.
Editora: A editora do livro.

Fluxo:
O usuário preenche os campos e clica em "Cadastrar Livro".
O sistema verifica se todos os campos foram preenchidos corretamente.
Se algum campo estiver vazio ou inválido, o sistema exibe um alerta.
O livro é então enviado para o backend via API, onde será armazenado.

Edição de Livro
O formulário de edição permite que o usuário altere as informações de um livro já cadastrado. Os campos editáveis são os mesmos do cadastro, mas o usuário pode modificar os dados existentes.

Exclusão de Livro
o usuario tem a possibilidade na tela de 'Listar livros'de ecluir determinado livro que quiser

MÉTODOS 
POST /livros
Descrição: Cadastra um novo livro.
Request Body:
json
{
  "titulo": "Título do Livro",
  "numeroPaginas": 100,
  "isbn": "978-3-16-148410-0",
  "editora": "Editora XYZ"
}
Resposta:
json
{
  "id": 1,
  "titulo": "Título do Livro",
  "numeroPaginas": 100,
  "isbn": "978-3-16-148410-0",
  "editora": "Editora XYZ"
}

GET /livros/{id}
Descrição: Retorna as informações de um livro específico.
Parâmetros:
id (obrigatório): ID do livro.
Resposta:
json
{
  "id": 1,
  "titulo": "Título do Livro",
  "numeroPaginas": 100,
  "isbn": "978-3-16-148410-0",
  "editora": "Editora XYZ"
}

GET /livros 
Descrição: lista todos os livros do banco de dados
Parâmetros:
http://localhost:3000/livros
resposta: lista dos livros cadastrados

PUT /livros/{id}
Descrição: Atualiza as informações de um livro existente.
Request Body:
json
{
  "titulo": "Novo Título do Livro",
  "numeroPaginas": 120,
  "isbn": "978-3-16-148410-1",
  "editora": "Nova Editora"
}
Resposta:
Json atualizado

DELETE /livros/{id}
Descrição: Exclui um livro específico com base no ID fornecido.
URL: http://localhost:3000/livros/{id} (substitua {id} pelo ID de um livro existente)


Scripts para rodar Back e Front:

Back > npm start

 "scripts": {
  "start": "node index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},

Front > npm run dev 
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
