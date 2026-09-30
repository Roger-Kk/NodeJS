
//tarefa.service.js

import { tarefaRepository } from "../repositories/tarefa.repository.js";

export const tarefaService = {

  // Função para listar todas as tarefas
  listar() {
    //listar os todos dados
    const tarefas = tarefaRepository.listar();
    const quantidade = tarefas.length;

    return { quantidade, itens: tarefas };
  },

  //busca uma tarefa por id
  buscarPorId(id) {
    //Busca uma tarefa por id
    const resultado = tarefaRepository.buscarPorId(id);

    if (!resultado.length) {
      throw new erro("Tarefa não encontrada");
    }

    return resultado;
  },

  //cria uma nova tarefa
  criar(dados) {
    //Criar uma nova Tarefa
    if (!dados.titulo) {
      throw new error("O titulo é obrigatório");
    }

    return tarefaRepository.criar(dados);
  },

  // atualiza uma tarefa existente
  atualizar(id, mudanca) {
    //atualiza dados da tarefa
    const tarefa = tarefaRepository.buscarPorId(id);

    if (!tarefa) {
      throw new error("Tarefa não encontrada");
    }

    return tarefaRepository.atualizar(id, mudanca);
  },

  // remove uma tarefa existente
  remover(id) {
    // remove a tarefa
    const tarefa = tarefaRepository.buscarPorId(id);

    if (!tarefa) {
      throw new error("Tarefa não encontrada");
    }

    return tarefaRepository.remover(id);
  },
};