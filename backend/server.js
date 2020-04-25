const express = require("express")
const app = express()
const mongoose = require("mongoose")
const toDoItemRoutes = require("./routes/todoitem-routes")
const cors = require("cors")

require("dotenv").config()

mongoose.connect(process.env.MONGODB, () => {
    console.log('db connected')
})
app.use(cors())

app.use(express.json())

app.use("/todoitems", toDoItemRoutes)

app.listen(3000, () => {
    console.log('server up')
})