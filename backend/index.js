const { todo } = require("./db");
const { createTodo, updateTodo } = require("./Types");
const cors = require("cors");
const express = require("express")
const app = express()
const port = 3000 
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}))
// boilerplate done



// working code
app.get("/todos", async (req, res) => {
    const todos = await todo.find({});
    res.json({
        msg: "todo created"
    })
});


app.post("/todo", async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
});



app.put("/completed", async function (req, res) {
    const UpdatePayload = req.body
    const parsedPayload = updateTodo.safeParse(UpdatePayload);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "you sent the wrong inputs"
        })
        return;
    }
    // should you await it or not?
    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({
        msg: "todo marked as completed"
    })
});



// Listening at 3000 
app.listen(port , () => {
    console.log(`Example app listening on port ${port}`);
})