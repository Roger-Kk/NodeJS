
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

// Criando uma instância do express
const app = express();

// Configurando o express para aceitar requisições com corpo em formato JSON
app.use(express.json());
app.use("/tarefas", tarefaRouter);

// Iniciando o servidor na porta 3000 em localhost
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
})




