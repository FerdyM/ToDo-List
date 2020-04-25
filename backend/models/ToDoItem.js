const mongoose = require("mongoose")
const Schema = mongoose.Schema

const toDoItemSchema = new Schema({
    name: String,
    task: String,

})

const ToDoItem = mongoose.model('ToDo Item', toDoItemSchema)

module.exports = ToDoItem;