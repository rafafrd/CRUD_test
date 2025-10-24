const { pool } = require("../config/db");

const alunoModel = {
  selecionaTodosAlunos: async () => {
    const sql = "SELECT * FROM alunos;";
    const [rows] = await pool.query(sql);
    console.log(rows);
    return rows;
  },
  selecionaAlunoPorId: async (pId) => {
    const sql = "SELECT * FROM alunos WHERE id=?;";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  insereAluno: async (pNome, pMatricula) => {
    const sql = "INSERT INTO alunos(nome, matricula) VALUES (?,?);";
    const values = [pNome, pMatricula];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  atualizaAluno: async (pId, pNome, pMatricula) => {
    const sql = "UPDATE alunos SET nome=?, matricula=? WHERE id=?;";
    const values = [pNome, pMatricula, pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
};

module.exports = { alunoModel };
