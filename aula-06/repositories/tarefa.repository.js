
//tarefa.repository.js

let lista = [];

let proximoId = 0;

export const tarefaRepository = {

  // Função para listar todas as tarefas  
  listar() {
    // responder com todas as lista da lista
    return lista;
  },
  buscarPorId(id) {
    return lista.find((item) => item.id === id);
  },

  // Função para criar uma nova tarefa
  criar(dados) {
    const novoDado = {
      id: proximoId++,
      ...dados,
    };
    lista.push(novoDado);
    return novoDado;
  },

// Função para atualizar uma tarefa existente
  atualizar(id, mudanca) {
    const indice = lista.findIndex((item) => item.id === id);

    if (indice === -1) {
      return null;
    }

    lista[indice] = { ...lista[indice], ...mudanca, id };
    return lista[indice];
  },

// Função para remover uma tarefa existente
  remover(id) {
    const indice = lista.findIndex((item) => item.id === id);

    if (indice === -1) {
      return null;
    }

    lista.splice(indice, 1);
    return true;
  },
};
