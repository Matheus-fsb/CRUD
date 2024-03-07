const express = require('express') //importacao do pacote que trabalha com http
const app = express() //instanciando express
const mysql = require('mysql2'); // Inclui a Api que conecta ao Mysql
const path = require('path')

// Adicionando o middleware para processar o corpo da requisição como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Rota para a página de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
  });

// cria a conexao com o banco de dados
const connection = mysql.createPool({
  host: 'localhost', // coloque aqui o ip ou nome da máquina
  user: 'root', // mude aqui o usuário
  password: 'root', // mude aqui a senha
  database: 'dbatores' // mude aqui o nome do bd
});
// Endereco da requisicao do clinte no browse localhost/cidades mostra todas as cidades 
app.get('/atores', function (req, res) { 
  connection.query('SELECT * FROM atores ',
  function(err, results) {
    res.send(results)
  }
);})

app.get('/atores/:codAtor', function (req, res){
  connection.query('SELECT * FROM atores where codAtor= ?', [req.params.codAtor],
  function(err, results) {
    res.send(results)
  }
);})

app.post('/atores', function (req, res) {
  const { codAtor, nomAtor, sobrenomeAtor } = req.body;
  console.log(nomAtor);
  connection.query('INSERT INTO atores (codAtor, nomAtor, sobrenomeAtor) VALUES (?, ?, ?)', [codAtor, nomAtor, sobrenomeAtor,], function(err, results) {
    if (err) {
      res.status(500).send('Erro ao inserir ator.');
    } else {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html')); 
    }
  });
});


app.listen(80) //execucao do servidor http