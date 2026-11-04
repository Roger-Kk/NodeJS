// Script de "seed": enche o banco com dados de exemplo.
// Rode com: npm run popular
//
// Útil para começar do zero sem cadastrar tudo na mão.

import { db } from "./conexao.js";

const EXEMPLOS = [
  { titulo: "Estudar Node.js", concluida: 1, prioridade: "alta" },
  { titulo: "Aprender Express", concluida: 0, prioridade: "alta" },
  { titulo: "Entender camadas", concluida: 0, prioridade: "media" },
  { titulo: "Praticar SQL", concluida: 0, prioridade: "alta" },
  { titulo: "Revisar assincronia", concluida: 1, prioridade: "baixa" },
];

// Limpa antes de popular, para o script poder ser rodado várias vezes.
db.exec("DELETE FROM tarefas");
db.exec("DELETE FROM sqlite_sequence WHERE name = 'tarefas'"); // zera o AUTOINCREMENT

// prepare() UMA vez, run() várias: é mais rápido e mais seguro.
const inserir = db.prepare(
  "INSERT INTO tarefas (titulo, concluida, prioridade, criada_em) VALUES (?, ?, ?, ?)",
);

for (const item of EXEMPLOS) {
  inserir.run(
    item.titulo,
    item.concluida,
    item.prioridade,
    new Date().toISOString(),
  );
}

const { total } = db.prepare("SELECT COUNT(*) AS total FROM tarefas").get();
console.log(`✅ Banco populado com ${total} tarefas.`);
