const express = require("express");
const router = express.Router();

const { alunoRoutes } = require("./alunoRoutes");

router.use("/", alunoRoutes);

router.use((req, res) => {
  res.status(404).send(`Página não encontrada`);
});

module.exports = { router };
