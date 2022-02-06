const { Router } = require("express");
const { getTodos, postTodo } = require("./todos.controller");

const router = Router();

// router.get("/todos", getTodos)
// router.post("/todos", postTodo)
// /api/todos/ 
router.route("/")
    .get(getTodos)
    .post(postTodo)

    // /api/todos/:id
// router.route("/:id")


module.exports = router;
