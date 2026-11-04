import { tarefaService } from "../services/tarefa.service.js";

export const tarefaController = {
  listar(req, res, next) {
    try {
      const tarefas = tarefaService.listar();
      res.status(200).json(tarefas);
    } catch (error) {
      next(error);
    }
  },
  buscarPorId(req, res, next) {
    try {
      const tarefa = tarefaService.buscarPorId(Number(req.params.id));
      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }
      res.status(200).json(tarefa);
    } catch (error) {
      next(error);
    }
  },
  criar(req, res, next) {
    try {
      const tarefa = tarefaService.criar(req.body);
      res.status(201).json(tarefa);
    } catch (error) {
      next(error);
    }
  },
  atualizar(req, res, next) {
    try {
      const tarefa = tarefaService.atualizar(Number(req.params.id), req.body);
      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }
      res.status(200).json(tarefa);
    } catch (error) {
      next(error);
    }
  },
  remover(req, res, next) {
    try {
      const tarefa = tarefaService.remover(Number(req.params.id));
      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  estatisticas(req, res, next) {
    try {
      const estatisticas = tarefaService.estatisticas();
      res.status(200).json(estatisticas);
    } catch (error) {
      next(error);
    }
  },
};
