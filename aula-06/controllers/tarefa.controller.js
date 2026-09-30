
import { tarefaService } from "../services/tarefa.service.js";

    export const tarefaController = {

    // Função para listar todas as tarefas
        listar(req, res, next) {
            try {
                const resultado = tarefaService.listar();
                res.json(resultado);
            } catch (erro) {
                next(erro);
            }
        },

    // Função para buscar uma tarefa por ID
    buscarPorId(req, res, next) {
        try {
            const id = Number(req.params.id);
            const resultado = tarefaService.buscarPorId(id);
            res.json(resultado);
        } catch (erro) {
            next(erro);
        }
    },

    // Função para atualizar uma tarefa existente
        atualizar(req, res, next) {
            try {
                const id = Number(req.params.id);   
                const mudanca = req.body;
                const resultado = tarefaService.atualizar(id, mudanca);
                res.json(resultado);
            } catch (erro) {
                next(erro);
            }
        },


    // Função para remover uma tarefa existente
    remover(req, res, next) {
        try {
            const id = Number(req.params.id);
            const resultado = tarefaService.remover(id);
            if (resultado) {
                res.status(204).send();
            }
        } catch (erro) {
            next(erro);
        }
    },

    // Função para criar uma nova tarefa
    criar(req, res, next) {
        try {
            const nova = tarefaService.criar(req.body);
            res.status(201).json(nova);
        } catch (erro) {
            next(erro); // manda para o middleware de erro
        }
    },
};