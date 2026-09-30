
//server.js

// Importando o módulo express, OBS: instalado com o comando: npm install express no terminal
import express from "express";

// Criando uma instância do express
const app = express();
// Configurando o express para aceitar requisições com corpo em formato JSON
app.use(express.json());


const tarefas = [];
let proximoId = 1;

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

//GET: Retorna todas as tarefas
app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

//POST: Cria uma nova tarefa
app.post("/tarefas", (req, res) => {
  const novaTarefa = {
    id: proximoId++,
    ...req.body,
    concluida: false,
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

//PARAMS
//Param é um parâmetro que é passado na URL, por exemplo: /tarefas/:id, onde :id é um parâmetro que pode ser acessado através de 
// req.params.id, os parâmetros vem após o endpoint, separados por /, e são identificados pelo : antes do nome do parâmetro.
//Params: para acessar parâmetros na URL, usamos req.params.nomeDoParametro

//GET com id: Retorna uma tarefa específica
app.get("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id); //Number() converte a string para número, motivo: req.params.id retorna uma string, e precisamos de um número para comparar com o id da tarefa
  const tarefa = tarefas.find((item) => item.id === id);

  res.status(200).json(tarefa);
});

//PUT: Atualiza uma tarefa existente
app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id); //Number() converte a string para número, motivo: req.params.id retorna uma string, e precisamos de um número para comparar com o id da tarefa
  const atualizaTarefa = req.body;

  console.log("Atualizando tarefa com ID:", id);

  const tarefa = tarefas.filter((item) => item.id === id);
  console.log("Tarefa encontrada:", tarefa);

  const atualizado = {
    ...tarefa[0],
    ...atualizaTarefa,
  };

  const index = tarefas.findIndex((item) => item.id === id);

  tarefas[index] = atualizado;

  res.status(200).json(atualizado);
});

//DELETE: Remove uma tarefa existente
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tarefas.findIndex((item) => item.id === id);

  if (index !== -1) {
    tarefas.splice(index, 1);
    res.status(200).json({ message: "Tarefa removida com sucesso!" });
  } else {
    res.status(404).json({ message: "Tarefa não encontrada!" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
})

