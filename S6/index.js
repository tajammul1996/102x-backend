const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require("./src/utils/db-connection");
const todosRouter = require("./src/resources/todos/todos.router");
const usersRouter = require("./src/resources/users/users.router");

const Todo = require("./src/resources/todos/todos.model");



const app = express();

app.use(bodyParser.json());

app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);

// /api/todos/1

app.get("/", (req, res) => res.json({ message: "Hello World" }));


const startServer = () => {
  sequelize.sync();
  sequelize.authenticate()
  .then(() => {
    console.log("Database connected!")
    app.listen(4000, () => console.log("Port 4000 is listening"));
  }).catch(e => console.log(e))
}

startServer();



// /users, /todos, 