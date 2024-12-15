const mysql = require("mysql");

exports.handler = async (event) => {
  // Buat koneksi di dalam handler
  const connection = mysql.createConnection({
    host: "grilli-db.cluster-cpwak0qwaess.us-east-1.rds.amazonaws.com", // Endpoint RDS
    user: "admin", // Username
    password: "admin123", // Password
    database: "grilli-db", // Nama database (pastikan ini benar)
  });

  // Parsing request body
  const requestBody = JSON.parse(event.body);
  const { name, phone, guests, date } = requestBody;

  const query = `INSERT INTO reservations (name, phone, guests, date) VALUES (?, ?, ?, ?)`;

  return new Promise((resolve, reject) => {
    // Jalankan query
    connection.query(query, [name, phone, guests, date], (error, results) => {
      // Tutup koneksi setelah selesai
      connection.end();

      if (error) {
        console.error("Database Error: ", error);
        reject({
          statusCode: 500,
          body: JSON.stringify({
            message: "Database error",
            error,
          }),
        });
      } else {
        resolve({
          statusCode: 200,
          body: JSON.stringify({
            message: "Reservation saved successfully",
            results,
          }),
        });
      }
    });
  });
};
