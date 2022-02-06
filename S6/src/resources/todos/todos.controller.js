const getTodos = (req, res) => {
    return res.status(200).json({
        success: true,
        error: null,
        data: {
            todos: [],
        },
    })
}

const postTodo = (req, res) => {
    return res.status(201).json({
        success: true,
        error: null,
        data: { 
            todos: []
        }
    })
}

module.exports = {
    getTodos,
    postTodo
}