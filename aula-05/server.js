
//server.js -- CONTINUAÇÃO DA AULA 04

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

//CONTINUAÇÃO DA AULA 05...

//POST: Cria uma nova tarefa
app.post("/tarefas", (req, res) => {

  //Desestruturação do objeto req.body para obter os valores de titulo e descricao
  const { titulo, descricao } = req.body; 

  //Validação para verificar se os campos titulo e descricao foram preenchidos, caso contrário retorna um erro 400 (Bad Request)
  if (!titulo || !descricao) {
    return res.status(400).json({ message: "Título e descrição são obrigatórios!" });
  }
  
  //Criação de um novo objeto tarefa com os valores recebidos no body da requisição, e atribuição de um ID único e a data de criação
  const novaTarefa = {
    id: proximoId++,
    titulo: titulo.trim(), //trim() remove espaços em branco no início e no final da string
    descricao: descricao.trim(),
    concluida: false,
    criadaEm: new Date().toISOString(), //toISOString() retorna a data no formato ISO 8601, que é o formato padrão para datas em JSON
  };

  //Adiciona a nova tarefa ao array de tarefas e retorna a tarefa criada com status 201 (Created)
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


//PUT: Atualiza uma tarefa existente por completo, ou seja, substitui todos os campos da tarefa pelo que foi enviado no body da requisição.
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



// PATCH — altera parcialmente uma tarefa existente, ou seja, substitui apenas os campos que foram enviados no body da requisição.
app.patch("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = tarefas.findIndex(
        (tarefa) => tarefa.id === id
    );

    if (indice === -1) {
        return res
            .status(404)
            .json({
                erro: `Tarefa ${id} não encontrada`
            });
    }

    const { titulo, concluida, prioridade } = req.body;

    // Só troca o que veio; o resto permanece.
    // Repare no spread da aula 02.
    const atualizada = {
        ...tarefas[indice],
        ...(titulo !== undefined && { titulo }),
        ...(concluida !== undefined && { concluida }),
        ...(prioridade !== undefined && { prioridade }),
    };

    tarefas[indice] = atualizada;

    res.json(atualizada);
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



