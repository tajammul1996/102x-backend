import express from "express";

const app = express()

// app.get(path or route, handler function)
// app.get("/", function(req, res) {
//    return res.send(" hello express ")
// })

const isAuthenticated = (req, res, next) => {
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    console.log("authenticated!");
    next();
}

app.get("/", (req, res) => res.send("hello express"));



app.get("/api/characters", isAuthenticated, function(req, res) {
    return res.send({
        results: [{
            name: "jake"
        }],
        success: true
    })
})

app.post("/api/characters", (req, res) => res.send({ message: "this is post call"}))


app.listen(4000);

