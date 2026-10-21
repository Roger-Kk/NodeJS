
//server.js -- CONTINUAÇÃO DA AULA 05

//Reestruturação do código em camadas:
// Requisição HTTP
//  ↓
//┌─────────────────┐
//│ ROUTES │ "que rotas existem?" → só declara caminhos
//├─────────────────┤
//│ CONTROLLER │ "traduz HTTP ↔ negócio" → lê req, devolve res
//├─────────────────┤
//│ SERVICE │ "quais são as regras?" → o cérebro
//├─────────────────┤
//│ REPOSITORY │ "onde os dados ficam?" → só acessa dados
//└─────────────────┘
//  ↓
// Array / Banco de dados



// Importando o módulo express, OBS: instalado com o comando: npm install express no terminal
import express from "express";
import tarefaRouter from "./routes/tarefa.routes.js";
import { tratadorDeErros } from "./middlewares/tratadorDeErros.js";

// Criando uma instância do express
const app = express();


//Configurar o servidor para aceitar requisições com corpo em formato JSON somente do localhost
app.use((req, res, next) => {
  const origem = req.headers.origin;
  if (origem === "http://localhost:3000") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
    if(req.method === "OPTIONS") {
      return res.sendStatus(200);
      next(); 
    }
});

// Configurando o express para aceitar requisições com corpo em formato JSON
app.use(express.json());
app.use("/tarefas", tarefaRouter);
app.use(tratadorDeErros);


// Iniciando o servidor na porta 3000 em localhost
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
})




