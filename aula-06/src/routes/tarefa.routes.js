
// aula-06/routes/tarefa.routes.js
import { Router } from "express";
import { tarefaController } from "../controllers/tarefa.controller.js";

const router = Router();

router.get("/", tarefaController.listar);
router.post("/", tarefaController.criar);
router.get("/:id", tarefaController.buscarPorId);
router.patch("/:id", tarefaController.atualizar);
router.delete("/:id", tarefaController.remover);

export default router;