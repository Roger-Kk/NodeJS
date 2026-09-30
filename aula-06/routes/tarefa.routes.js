
// aula-06/routes/tarefa.routes.js
import { Router } from "express";
import { tarefaController } from "../controllers/tarefa.controller.js";

const router = Router();

router.get("/tarefas", tarefaController.listar);
router.post("/tarefas", tarefaController.criar);
router.get("/tarefas/:id", tarefaController.buscarPorId);
router.patch("/tarefas/:id", tarefaController.atualizar);
router.delete("/tarefas/:id", tarefaController.remover);

export default router;