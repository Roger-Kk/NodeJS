import { Router } from "express";
import { tarefaController } from "../controllers/tarefa.controller.js";

const router = Router();

router.get("/estatisticas", tarefaController.estatisticas);
router.get("/", tarefaController.listar);
router.post("/", tarefaController.criar);
router.put("/:id", tarefaController.atualizar);
router.get("/:id", tarefaController.buscarPorId);
router.delete("/:id", tarefaController.remover);

export default router;
