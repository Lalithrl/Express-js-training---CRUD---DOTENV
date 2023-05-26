// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import moviesRouter from "./routes/movies.route.js"
import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env.MONGO_URL); // env -> environment variables

const app = express();

const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://127.0.0.1:27017";
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
// top-level await
await client.connect();
console.log("Mongo is connected");

// express.json() - middleware(inbuilt) | converts data to JSON
// app.use -> intercepts -> applies express.json()
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 Cool !!");
});

app.use('/movies',moviesRouter)

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


// GET - Done
// POST - Done
// PUT - Done
// DELETE - Done

export {client};