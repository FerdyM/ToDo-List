const router = require("express").Router()
const ToDoItem = require("../models/ToDoItem")

router.get("/allitems", async (req, res) => {
    var allItems = await ToDoItem.find({})
    res.send(allItems)
})

router.post("/create", async (req, res) => {
    console.log(req.body.item)
    let newItem = new ToDoItem({
        name: req.body.item.name,
        task: req.body.item.task
    })
    await newItem.save().then((newItem) => {
        console.log(`New ToDoItem created: ${newItem}`)
        res.send("success")
    })
})
module.exports = router