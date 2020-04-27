const express = require("express")
const app = express()
const mongoose = require("mongoose")
const toDoItemRoutes = require("./routes/todoitem-routes")
const cors = require("cors")
const PORT = process.env.PORT || 3000
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
  
app.use(cors(corsOptions))
require("dotenv").config()

mongoose.connect(process.env.MONGODB, () => {
    console.log('db connected')
})

app.use(express.json())

app.use("/todoitems", toDoItemRoutes)

app.listen(PORT, () => {
    console.log('server up')
})