import express from "express";
import bodyParser from "body-parser";

// import {todos} from "./todos";
const todos = [
    {
      id: 1,
      text: "Learn React",
      completed: true
    },
    {
      id: 2,
      text: "Learn Redux",
      completed: false
    },
    {
      id: 3,
      text: "Learn GraphQL",
      completed: false
    },
    {
        id: 4,
        text: "Learn Node",
        completed: false
    },
    {
        id: 5,
        text: "Learn Express",
        completed: false
    },
    {
        id: 6,
        text: "Learn MongoDB",
        completed: false
    },
    {
        id: 7,
        text: "Learn Mongoose",
        completed: false
    },
    {
        id: 8,
        text: "Learn REST",
        completed: false
    },
    {
        id: 9,
        text: "Learn GraphQL",
        completed: false
    },
    {
        id: 10,
        text: "Learn Node",
        completed: false
    },
    {
        id: 11,
        text: "Learn Express",
        completed: false
    },
    {
        id: 12,
        text: "Learn MongoDB",
        completed: false
    },
    {
        id: 13,
        text: "Learn Mongoose",
        completed: false
    },
    {
        id: 14,
        text: "Learn REST",
        completed: false
    },
    {
        id: 15,
        text: "Learn GraphQL",
        completed: false
    },

  ];

const app = express();

function logger(req, res, next) {
  console.log(`${req.method} ${req.path} `);
  next();
}

app.use(logger);
app.use(bodyParser.json());

function responseBuilder(success, error, data) {
    return {
        success, error, data
    }
}

app.get("/", (req, res, next) => {
  res.json({ message: "Hello World" });
});

app.get("/api/todos", (req, res) => {

const search = req.query.search
const page = parseInt(req.query.page) || 1
// const completed = req.query.completed
// if(search){
//     let filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()));
//     return res.status(200).json(responseBuilder(true, null, {todos: filteredTodos}));
// }
const limit = 5

  return res.status(200).json(responseBuilder(true, null, { todos: todos.slice((page*limit)-limit, page * limit) }));
});

app.get("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return res.status(400).json(responseBuilder(false, `Todo not found - ${id}`, null));
  }

  return res.status(200).json(responseBuilder(true, null, { todo }));
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

  console.log(id, todoIndex);

  if (todoIndex == -1) {
    return res.status(400).json(responseBuilder(false, `Todo not found - ${id}`, null));
  }

  let deletedTodo = todos.splice(todoIndex, 1);

  return res.status(200).json(responseBuilder(true, null, { todo: deletedTodo }));
});

app.post("/api/todos", (req, res) => {
  const text = req.body.text;
  if (!text) {
    return res.status(400).json(responseBuilder(false, "Text is required", null));
  }

  const newTodo = {
    id: todos.length + 1,
    text: text,
    completed: false
  };

  todos.push(newTodo);

  return res.status(201).json(responseBuilder(true, null, { todo: newTodo }));

  // console.log(req.body);
});

app.patch("/api/todos/:id", (req, res) => {
    const id = req.params.id;

    const data = req.body;

    let todo = todos.find((todo) => todo.id === parseInt(id));
    const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

    if (!todo) {
        return res.status(400).json(responseBuilder(false, `Todo not found - ${id}`, null));
    };

    todo = {...todo, ...data};

    // console.log(todo, todos);
    // todo.text = data.text;
    // todo.completed = data.completed;
    // todos = [...todos.slice(0, todoIndex), todo, ...todos.slice(todoIndex + 1)];

    todos.splice(todoIndex, 1, todo);

    // console.log(todo, todos);
    return res.status(200).json(responseBuilder(true, null, { todo }));
});


// let name = "John doe";
// name.includes("john");
// map, filter, includes, find, findIndex, slice, splice, sort, reduce

app.listen(4000, () => console.log("Server started on port 4000"));
