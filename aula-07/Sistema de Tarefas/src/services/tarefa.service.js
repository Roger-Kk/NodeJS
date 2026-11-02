import { ErroDeValidacao, ErroNaoEncontrado } from "../errors/index.js";
import { tarefaRepository } from "../repositories/tarefa.repository.js";

export const tarefaService = {
  listar() {
    //listar os todos dados
    const tarefas = tarefaRepository.listar();
    const quantidade = tarefas.length;

    return { quantidade, itens: tarefas };
  },
  buscarPorId(id) {
    //Busca uma tarefa por id
    const resultado = tarefaRepository.buscarPorId(id);

    if (!resultado.length) {
      throw new ErroNaoEncontrado("Tarefa não econtrada");
    }

    return resultado;
  },
  criar(dados) {
    //Criar uma nova Tarefa
    if (!dados.titulo) {
      throw new ErroDeValidacao("O titulo é obrigatório");
    }
    if (!dados.dataCriacao) {
      throw new ErroDeValidacao("A data de criação é obrigatória");
    }

    return tarefaRepository.criar(dados);
  },
  atualizar(id, mudanca) {
    //atualiza dados da tarefa
    const tarefa = tarefaRepository.buscarPorId(id);

    if (!tarefa) {
      throw new ErroNaoEncontrado("Tarefa não encontrada");
    }

    return tarefaRepository.atualizar(id, mudanca);
  },
  remover(id) {
    // remove a tarefa
    const tarefa = tarefaRepository.buscarPorId(id);

    if (!tarefa) {
      throw new ErroNaoEncontrado("Tarefa não encontrada");
    }

    return tarefaRepository.remover(id);
  },

  estatisticas() {
    const todas = tarefaRepository.listar();
    const concluidas = todas.filter((tarefa) => tarefa.concluida).length;

    return {
      total: todas.length,
      concluidas,
      pendentes: todas.length - concluidas,
      percentualConcluido:
        todas.length === 0 ? 0 : Math.round((concluidas / todas.length) * 100),
    };
  },
};
