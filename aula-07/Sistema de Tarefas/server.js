import express from "express";
import tarefaRoutes from "./src/routes/tarefa.routes.js";
import tratadorDeErros from "./src/middlewares/tratadorDeErros.js";
import { rotaNaoEncontrada } from "./src/middlewares/rotaNaoEncontrada.js";

const app = express();

// Permite usar um frontend separado: arquivo HTML ou servidor local (Live Server).
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Vary", "Origin");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());

app.use("/tarefas", tarefaRoutes);

app.use(rotaNaoEncontrada);
app.use(tratadorDeErros);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
