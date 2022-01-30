import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const todos = [
    {
        id: 1,
        text: 'Learn React',
        completed: true
    },
    {
        id: 2,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 3,
        text: 'Learn GraphQL',
        completed: false
    }
];

// response structure
/**
 * {
 *  success: Boolean,
 *  error: String,
 *  data: Object
 * }
 */

function logger(req, res, next) {
    console.log(`${req.method} ${req.path} `);
    next();
}

app.use(logger);
app.use(bodyParser.json());


// Routing layer
// instance.httpmethod(path, callback(req, res))
app.get("/", (req, res, next) => {
    res.json({ message: "Hello World" })
});

app.get("/api/todos", (req, res) => {
   return res.status(200).json({
        success: true,
        error: null,
        data: {
            todos: todos
        }
    })
});

app.post("/api/todos", (req, res) => {
    const text = req.body.text;
    if(!text) {
        return res.status(400).json({
            success: false,
            error: "You must provide todo",
            data: null
        })
    }

    const newTodo = {
        id: todos.length + 1,
        text: text,
        completed: false
    }

    todos.push(newTodo);

    return res.status(201).json({
        success: true,
        error: null,
        data: {
            todo: newTodo
        }
    })

    // console.log(req.body);
})



// start the server
// app.listen(PORT, function[optional])

// http://localhost:4000/api/todos
// 1. write api to delete a todo
// 2. Create react app and integrate these apis
app.listen(4000, () => console.log('Server started on port 4000'));

// middleware