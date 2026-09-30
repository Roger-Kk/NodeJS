
//server.js

// Importando o módulo express, OBS: instalado com o comando: npm install express no terminal
import express from "express";

// Criando uma instância do express
const app = express();

// Configurando o express para aceitar requisições com corpo em formato JSON
app.use(express.json());

// Iniciando o servidor na porta 3000 em localhost
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
})


// Requisições HTTP para o endpoint /tarefas
//Toda requisição é composta por um método HTTP (GET, POST, PUT, DELETE, etc.), uma URL (endpoint) e um corpo (body) opcional.

//O body é um objeto que contém os dados que serão enviados na requisição, e é acessado através de req.body. 
// O body é usado principalmente em requisições POST e PUT, onde precisamos enviar dados para o servidor.
//Exemplo:
//req.body = {
//  "titulo": "Estudar Node.js",
//  "descricao": "Aprender sobre o framework Express e como criar APIs RESTful"
//}

//O retorno: res, é um objeto que contém informações sobre a resposta que será enviada ao cliente, 
// como status, headers e corpo da resposta. O res é usado para enviar a resposta de volta ao cliente, seja ela um JSON, 
// HTML, texto ou outro formato.
//Exemplo:
//res.status(200).json({
//  "message": "Requisição bem sucedida!",
//  "data": tarefas
//});


//Conteúdo da API
const tarefas = [
  {
    id: 1,
    titulo: "Estudar Node.js",
    descricao: "Aprender sobre o framework Express e como criar APIs RESTful",
    concluida: false,
  }
];

//Variável para controlar o próximo ID a ser atribuído a uma nova tarefa
let proximoId = 2;


//GET: Retorna todas as tarefas
app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

//POST: Cria uma nova tarefa
app.post("/tarefas", (req, res) => {

  //console.log("BODY RECEBIDO:", req.body);
  const novaTarefa = {
    id: proximoId++,
    ...req.body,
    concluida: false,
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);

});


//GET com id: Retorna uma tarefa específica
app.get("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id); //Number() converte a string para número, motivo: req.params.id retorna uma string, e precisamos de um número para comparar com o id da tarefa
  const tarefa = tarefas.find((item) => item.id === id);

  res.status(200).json(tarefa);
});

