// const mysql = require("mysql2/promise");

// let connection;

// const connectDatabase = async () => {
//   if (!connection) {
//     connection = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "Shubh@7770025901",
//       database: "softech",
//     });
//   }
//   return connection;
// };

// module.exports = { connectDatabase };

// const sql = require("mssql");

// let connection;

// const connectDatabase = async () => {
//   if (!connection) {
//     try {
      // connection = await sql.connect({
        // user: "sftmaximexp",
        // password: "max!mexp@0209",
        // server: "dedi.softec.in",
        // database: "sft_maximexp",
      //   options: {
      //     encrypt: true, // Use this if you're connecting to Azure SQL or require encrypted connections
      //     trustServerCertificate: true // Use this if you're connecting to a local SQL Server instance without SSL
      //   }
//       });
//       console.log("Connected to SQL Server");
//     } catch (err) {
//       console.error("Failed to connect to SQL Server", err);
//       throw err;
//     }
//   }
//   return connection;
// };

// module.exports = { connectDatabase };


const sql = require("mssql");

const config = {
  user: "sftmaximexp",
  password: "max!mexp@0209",
  server: "dedi.softec.in",
  database: "sft_maximexp",
  options: {
    encrypt: false, // Use true if you're connecting to Azure SQL
    trustServerCertificate: true // Change to true for local dev / self-signed certs
  }
};

let pool;

const connectDatabase = async () => {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log("Connected to SQL Server");
    } catch (err) {
      console.error("Failed to connect to SQL Server", err);
      throw err;
    }
  }
  return pool;
};

module.exports = { connectDatabase, sql };
