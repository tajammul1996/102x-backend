import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
};

app.use(logger);

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
        text: 'Learn React Native',
        completed: false
    }
];

app.get("/api/todos", (req, res) => res.json({
    success: true,
    data: {
        todos
    }
}));

app.post("/api/todos", (req, res) => {
    console.log(req.body);
    const {
        text
    } = req.body;

    const todo = {
        id: todos.length + 1,
        text,
        completed: false
    };

    todos.push(todo);

    res.json({
        success: true,
        data: {
            todo
        }
    });
});

app.listen(4000);