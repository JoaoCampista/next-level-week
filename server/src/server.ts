import express from 'express';
// ao fazer essa importação ele retorna um erro, porque não tem a definição dos tipos utilizados no projeto
// para fazer essa definição devemos instalar uma biblioteca que informa os tipos das funções do express.
// para fazer esse instalação usamos npm install @types/express -D
// ao instalar uma dependencia com "-D" estamos dizendo que essa dependencia é apenas de desenvolvimento
// quando a aplicação for online não precisará das dependências.

const app = express();

app.get('/users', (request, response) => {
  // request para retornar as informações enviadas do front - response para devolver as respostas para o front
  console.log('listagem de usuários');
});

app.listen(3333);
