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
    await newItem.save()
        .then((newItem) => {
            console.log(`New ToDoItem created: ${newItem}`)
            res.status(200).send('success')
        }).catch((err) => console/log(err))
})

router.delete("/delete/:id", async (req, res) => {
    console.log(req.params.id)
    await ToDoItem.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('success')
            res.status(200).send('success')
        }
    })
})

router.get("/edit/:id", async (req, res) => {
    console.log(req.params.id)
    await ToDoItem.findById(req.params.id, (err, data) => {
        let itemToBeEdited = data
        console.log(itemToBeEdited)
        res.send(itemToBeEdited)
    
    })
})

router.post("/update/:id", async (req, res) => {
    console.log("item: " + req.body.item)
    await ToDoItem.findByIdAndUpdate(req.params.id, {name: req.body.item.name, task: req.body.item.task})
        .then(() => {
            res.send('success')
        }).catch((err) => {
            console.log(err)
            res.send('error')
        })
})


module.exports = router