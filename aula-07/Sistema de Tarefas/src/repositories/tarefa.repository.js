let lista = [];

let proximoId = 1;

export const tarefaRepository = {
  listar() {
    // responder com todas as lista da lista
    return lista;
  },
  buscarPorId(id) {
    return lista.find((item) => item.id === id);
  },
  criar(dados) {
    const novoDado = {
      id: proximoId++,
      ...dados,
    };
    lista.push(novoDado);
    return novoDado;
  },
  atualizar(id, mudanca) {
    const indice = lista.findIndex((item) => item.id === id);

    if (indice === -1) {
      return null;
    }

    lista[indice] = { ...lista[indice], ...mudanca, id };
    return lista[indice];
  },
  remover(id) {
    const indice = lista.findIndex((item) => item.id === id);

    if (indice === -1) {
      return null;
    }

    lista.splice(indice, 1);
    return true;
  },
};
