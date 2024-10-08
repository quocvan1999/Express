import express from "express";
import connect from "./dp.js";

// Tạo object tổng của express
const app = express();

// Thêm middlware để convert string sang json với API POST và PUT
app.use(express.json());

// API
app.get("/hello-world", (req, res) => {
  res.send("Hello world");
});

app.get("/health-check", (req, res) => {
  res.send("Server is normally");
});

// Lấy thông tin data từ params, query string, headers
// Get user
app.get("/get-user/:id/:hoTen", (req, res) => {
  // Lấy params và headers từ URL
  let { id, hoTen } = req.params;
  let { queryString } = req.query;
  let { token, authorization } = req.headers;
  res.send({ id, hoTen, queryString, token, authorization });
});

// Lấy body
app.post("/create-user", (req, res) => {
  let body = req.body;
  res.send(body);
});

// New API
app.get("/get-user-db", async (req, res) => {
  const [data] = await connect.query(`
        SELECT * FROM users
    `);
  res.send(data);
});

app.post("/create-user-db", async (req, res) => {
  const query = `
        INSERT INTO users(full_name, email, pass_word) VALUES
        (?, ?, ?)
    `;
  let body = req.body;
  let { full_name, email, pass_word } = body;
  const [data] = await connect.execute(query, [full_name, email, pass_word]);
  return res.send(data);
});

// define post cho backend
app.listen(8080, () => {
  console.log("BE starting with post 8080");
});
