const Todo = require("./todos.model");

const getTodos = (req, res) => {
  Todo.findAll({ raw: true })
    .then((todos) => {
      return res.status(200).json({
        success: true,
        error: null,
        data: {
          todos: todos,
        },
      });
    })
    .catch((e) =>
      res.status(500).json({
        message: "something went wrong",
      })
    );
};

const postTodo = (req, res) => {
  Todo.create({
    title: req.body.title,
    description: req.body.description,
  })
    .then((todo) => {
      return res.status(201).json({
        success: true,
        error: null,
        data: {
          todo: todo,
        },
      });
    })
    .catch((e) => {
        console.log(e);
      return res.status(500).json({
        message: "something went wrong",
      })}
    );
};

module.exports = {
  getTodos,
  postTodo,
};
