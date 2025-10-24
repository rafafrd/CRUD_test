const { alunoModel } = require("../models/alunoModel");
// GET /alunos
const alunoController = {
  buscarAlunos: async (req, res) => {
    try {
      const { idAluno } = req.params;
      let resultado;
      if (idAluno) {
        resultado = await alunoModel.selecionaAlunoPorId(idAluno);
        if (resultado.length === 0) {
          return res
            .status(200)
            .json({ message: "Não há dados com o id pesquisado" });
        }
        return res
          .status(200)
          .json({ message: "Dados da tabela Alunos", data: resultado });
      }
      resultado = await alunoModel.selecionaTodosAlunos();
      res
        .status(200)
        .json({ message: "Dados da tabela Alunos", data: resultado });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },



  // POST /alunos
  novoAluno: async (req, res) => {
    try {
      const { nome, matricula } = req.body;
      if (
        !nome ||
        !matricula ||
        typeof nome !== "string" ||
        !isNaN(matricula) ||
        nome.length < 3 ||
        matricula.length > 7
      ) {
        return res.status(400).json({ message: "dados inválidos" });
      }
      const resultado = await alunoModel.insereAluno(nome, matricula);

      if (resultado.affectedRows !== 0) {
        return res
          .status(201)
          .json({ message: "Resultado do Insert", data: resultado });
      } else {
        throw new Error("Ocorreu um erro ao inserir o registro");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },
  atualizaAluno: async (req, res) => {
    try {
      const idAluno = Number(req.params.idAluno);
      const { nome, matricula } = req.body;
      console.log(typeof nome, typeof matricula, typeof idAluno); // para debuggar
      if ( //validação
        !idAluno ||
        !Number.isInteger(idAluno) ||
        !nome ||
        !matricula ||
        typeof nome !== "string" ||
        !isNaN(matricula) ||
        nome.length < 3 ||
        matricula.length > 7
      ) {
        return res.status(400).json({ message: "dados inválidos" });
      }
      const resultado = await alunoModel.atualizaAluno(
        idAluno,
        nome,
        matricula
      );

      if (resultado.affectedRows !== 0) {
        return res
          .status(201)
          .json({ message: "Resultado da alteração", data: resultado });
      } else {
        throw new Error("Ocorreu um erro ao inserir o registro");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },
};
module.exports = { alunoController };