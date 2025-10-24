// importando modulos
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

//exemplo de configuração
// const pool = mysql.createPool({
//   host:'127.0.0.1',
//   user :'root',
//   password:'1234',
//   database:'escola',
//   port:'3306',
//   waitForConnections: true,  // Aguardar conexões livres
//   connectionLimit: 10,      // limita o número de conexões simultâneas
//   queueLimit: 0            // 0 = sem limite para fila
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado ao MySQL');
  } catch (error) {
    console.error(`Erro ao conectar com o MySQL: ${error}`);
  }
})();

module.exports = { pool };