require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5002;
const Book = require("./books/bookmodel");
const bookRouter = require("./routes/bookroutes");

function syncTables() {
    Author.hasMany(Book);
    Book.belongsTo(Author);
    Book.sync({alter: true});
    Author.sync({alter: true})
}

const Author = require("./author/authormodel");
const authorRouter = require("./routes/authorroutes");


// MIDDLEWARE SETUP

app.use(cors());  // allows us to connect a React Front End later

app.use(express.json());  // allows us to send requests in JSON and not XML

app.use(bookRouter);
app.use(authorRouter);

app.get("/health", (req,res) => res.status(200).json({message: "Server is ALIVE!!!"}));  // allows us to test the server is running

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    syncTables();
});