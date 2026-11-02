// Abre (ou cria) o arquivo do banco e prepara a estrutura.
// Todo o resto do projeto importa a conexão daqui.

import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";

const CAMINHO = new URL("./dados.db", import.meta.url);

// DatabaseSync cria o arquivo se ele ainda não existir.
export const db = new DatabaseSync(CAMINHO);

// ⚠️ No SQLite, a verificação de chaves estrangeiras vem DESLIGADA por padrão.
// db.exec("PRAGMA foreign_keys = ON");

// Roda o schema toda vez que o app sobe. Com IF NOT EXISTS, é seguro.
// import.meta.url é a URL do arquivo atual, e não do processo Node.
const schema = readFileSync(new URL("./schema.sql", import.meta.url), "utf-8");
db.exec(schema);

console.log(`Banco conectado: ${CAMINHO}`);
