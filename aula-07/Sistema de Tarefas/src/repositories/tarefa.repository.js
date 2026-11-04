
// Banco de dados do Sqlite, persistente, para fins de estudo. Os dados ficam salvos no arquivo "dados.db".
// repositories/tarefa.repository.js — versão SQLite

import { db } from "../banco/conexao.js";

// O banco fala "snake_case" (criada_em); o JavaScript fala "camelCase" (criadaEm).
// Traduzir entre os dois é trabalho DESTA camada — e de mais ninguém.

function paraObjeto(linha) {
    if (!linha) return null;

    return {
        id: linha.id,
        titulo: linha.titulo,
        concluida: linha.concluida === 1, // INTEGER → boolean
        prioridade: linha.prioridade,
        criadaEm: linha.criada_em,
    };
}

export const tarefaRepository = {
    listar() {
        const lista = db.prepare("SELECT * FROM tarefas ORDER BY id").all();
        return lista.map(paraObjeto);
    },

    buscarPorId(id) {
        const item = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id);
        return paraObjeto(item);
    },

    buscarPorTitulo(titulo) {
        const item = db
            .prepare("SELECT * FROM tarefas WHERE titulo = ?")
            .get(titulo);
        return paraObjeto(item);
    },

    criar(dados) {
        console.log(dados);
        dados.concluida = dados.concluida ? 1 : 0; // boolean → INTEGER
        const {titulo, concluida} = dados;
        const prioridade = dados.prioridade ?? "media"; // valor padrão
        const criadaEm = new Date().toISOString();
        const resultado = db.prepare(
            "INSERT INTO tarefas (titulo, concluida, prioridade, criada_em) VALUES (?, ?, ?, ?)",
        ).run(titulo, concluida, prioridade, criadaEm);

        const novoDado = {
            id: resultado.lastInsertRowid,
            titulo,
            concluida: concluida === 1,
            prioridade,
            criadaEm,
        };

        return novoDado;
    },

    atualizar(id, mudanca) {
        const colunas = [];
        const valores = [];

        if (mudanca.titulo !== undefined) {
            colunas.push("titulo = ?");
            valores.push(mudanca.titulo);
        }

        if (mudanca.concluida !== undefined) {
            colunas.push("concluida = ?");
            valores.push(mudanca.concluida ? 1 : 0);
        }

        if (mudanca.prioridade !== undefined) {
            colunas.push("prioridade = ?");
            valores.push(mudanca.prioridade);
        }

        if (colunas.length === 0) {
            return null // nada a atualizar
        }
        valores.push(id);
        const resultado = db.prepare(
            `UPDATE tarefas SET ${colunas.join(", ")} WHERE id = ?`,
        ).run(...valores);
    },

    remover(id) {
       const resultado = db.prepare("DELETE FROM tarefas WHERE id = ?").run(id);
       return resultado.changes > 0
    },
};



//Banco de dados em memória (armazenado em array) para fins de estudo. Não é persistente, ou seja, se você reiniciar o servidor, os dados somem.
// let lista = [];

// let proximoId = 1;

// export const tarefaRepository = {
//   listar() {
//     // responder com todas as lista da lista
//     return lista;
//   },
//   buscarPorId(id) {
//     return lista.find((item) => item.id === id);
//   },
//   criar(dados) {
//     const novoDado = {
//       id: proximoId++,
//       ...dados,
//     };
//     lista.push(novoDado);
//     return novoDado;
//   },
//   atualizar(id, mudanca) {
//     const indice = lista.findIndex((item) => item.id === id);

//     if (indice === -1) {
//       return null;
//     }

//     lista[indice] = { ...lista[indice], ...mudanca, id };
//     return lista[indice];
//   },
//   remover(id) {
//     const indice = lista.findIndex((item) => item.id === id);

//     if (indice === -1) {
//       return null;
//     }

//     lista.splice(indice, 1);
//     return true;
//   },
// };
