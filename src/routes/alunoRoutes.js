const express = require("express");
const alunoRoutes = express.Router();
const { alunoController } = require("../controllers/alunoController");

alunoRoutes.get("/alunos", alunoController.buscarAlunos);
alunoRoutes.get("/alunos/:idAluno", alunoController.buscarAlunos);
alunoRoutes.post("/alunos", alunoController.novoAluno);
alunoRoutes.put("/alunos/:idAluno", alunoController.atualizaAluno);

module.exports = { alunoRoutes };
