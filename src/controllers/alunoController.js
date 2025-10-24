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
  // PUT /alunos/:idAluno
  atualizaAluno: async (req, res) => {
    try {
      const idAluno = Number(req.params.idAluno);
      const { nome, matricula } = req.body;
      console.log(typeof nome, typeof matricula, typeof idAluno); // para debuggar
      if (
        //validação
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

      if (resultado.changedRows !== 0 || resultado.affectedRows !== 0) {
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
  // PATCH /alunos/:idAluno
  atualizaAlunoParcial: async (req, res) => {
    try {
      const idAluno = Number(req.params.idAluno);
      const { nome, matricula } = req.body;
      console.log(typeof nome, typeof matricula, typeof idAluno); // para debuggar
      if (
        //validação
        !idAluno ||
        !Number.isInteger(idAluno) ||
        (!nome && !matricula) ||
        typeof nome !== "string"
      ) {
        return res.status(400).json({ message: "dados inválidos" });
      }
      if ((nome && nome.length < 3) || (matricula && matricula.length < 7)) {
        return res.status(400).json({ message: "dados inválidos" });
      }

      const registroAtual = await alunoModel.selecionaAlunoPorId(idAluno);

      const novoNome = nome ?? registroAtual[0].nome;
      const novoMatricula = matricula ?? registroAtual[0].matricula;

      const resultado = await alunoModel.atualizaAluno(
        idAluno,
        novoNome,
        novoMatricula
      );

      if (resultado.changedRows !== 0 || resultado.affectedRows !== 0) {
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

  //
  excluiAluno: async (req, res) => {
    try {
      const idAluno = Number(req.params.idAluno);
      if (
        //validação
        !idAluno ||
        !Number.isInteger(idAluno)
      ) {
        return res.status(400).json({ message: "informe um ID válido" });
      }
      const resultado = await alunoModel.deletaAluno(idAluno);
      if (resultado.affectedRows !== 0) {
        return res
          .status(200)
          .json({ message: "Registro excluído com sucesso" });
      } else {
        return res.status(200).json({ message: "Registro não localizado" });
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
