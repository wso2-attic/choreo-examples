const express = require("express");
const { v4: uuidv4 } = require("uuid");

const Status = Object.freeze({
  reading: "reading",
  read: "read",
  to_read: "to_read",
});

const books = {};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/readinglist", (req, res) => {
  res.json(Object.values(books));
});

app.post("/readinglist", (req, res) => {
  const newBook = req.body;
  const bookId = uuidv4();
  books[bookId] = { ...newBook, id: bookId };
  res.status(201).json(books[bookId]);
});

app.delete("/readinglist/:id", (req, res) => {
  const id = req.params.id;
  delete books[id];
  res.json({});
});

app.listen(9090, () => {
  console.log("Server started on port 9090");
});
