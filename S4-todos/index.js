import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import { Op } from "sequelize";
import sequelize from "./db-connection.js";
import Todo from "./models/todo.model.js";


/**
 * update, delte - update, destroy - done
 * constraints and validations
 * getter and setter
 * */ 
// import {todos} from "./todos";


const app = express();

function logger(req, res, next) {
  console.log(`${req.method} ${req.path} `);
  next();
}

app.use(logger);
app.use(bodyParser.json());
app.use(cors());

function responseBuilder(success, error, data) {
    return {
        success, error, data
    }
}

app.get("/", (req, res, next) => {
  res.json({ message: "Hello World" });
});


app.get("/api/todos", (req, res) => {
  // console.log(req.)
  if(req.query.search){
   return Todo.findAll({
     where: {
       [Op.or]: {
         title: {
           [Op.substring]: req.query.search,
         },
         description: {
           [Op.substring]: req.query.search,
         },
       },
     },
   })
     .then((todos) => {
       return res.status(200).json(responseBuilder(true, null, { todos }));
     })
     .catch((e) => {
       console.log(e);
       return res
         .status(500)
         .json(responseBuilder(false, "Something went wrong", null));
     });
  }

  Todo.findAll()
    .then((todos) => {
      return res.status(200).json(responseBuilder(true, null, { todos }));
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json(responseBuilder(false, "Something went wrong", null));
    });
});

app.post("/api/todos", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  if (!title) {
    return res
      .status(400)
      .json(responseBuilder(false, "Title is required", null));
  }

  const newTodo = {
    title,
    description,
  };

  Todo.create(newTodo)
    .then((todo) => res.status(201).json(responseBuilder(true, null, { todo })))
    .catch((e) =>
      res.status(500).json(responseBuilder(false, "Something went wrong", null))
    );

  // console.log(req.body);
});

app.get("/api/todos/:id", (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then((todo) => {
      if (todo) {
        return res.status(200).json(responseBuilder(true, null, { todo }));
      }
      return res
        .status(400)
        .json(
          responseBuilder(true, "Requested todo with the id is not found", {
            todo: null,
          })
        );
    })
    .catch((e) =>
      res.status(500).json(responseBuilder(false, "Something went wrong", null))
    );
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: {
      id: id,
    },
  })
    .then((deletedTodo) => {
      console.log(deletedTodo);
      if(deletedTodo){

        return res.status(200).json(responseBuilder(true, null, { }));
      }
      return res
        .status(400)
        .json(responseBuilder(false, "Todo with the id not found", {  }));
    })
    .catch((e) =>
      res.status(500).json(responseBuilder(false, "Something went wrong", null))
    );
});

app.patch("/api/todos/:id", (req, res) => {
    const id = req.params.id;

    const data = req.body;

    Todo.update(data, {
      where: {
        id: id,
      },
    })
      .then((todo) => {
        console.log(todo[0])
        if (todo[0]) {
          return res.status(200).json(responseBuilder(true, null, {}));
        }
          return res.status(400).json(responseBuilder(false, "Id not found", {}));

      })
      .catch((e) =>
        res
          .status(500)
          .json(responseBuilder(false, "Something went wrong", null))
      );
});

const startServer = () => {
  sequelize.sync();
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected!");
      app.listen(4000, () => console.log("Port 4000 is listening"));
    })
    .catch((e) => console.log(e));
};

startServer();

