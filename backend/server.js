const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require('morgan')
const toDoItemRoutes = require("./routes/todoitem-routes")
const userRoutes = require('./routes/user')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dotenv = require("dotenv")
const passport = require("passport")
dotenv.config()
const PORT = process.env.PORT || 8080

const cors = require("cors")
const corsOptions = {
    origin: process.env.REACT_HOST,
    credentials: true,
};
  
app.use(cors(corsOptions))

mongoose.connect(process.env.MONGODB, () => {
    console.log(`db connected`)
})
app.use(morgan('dev'))
app.use(express.json())

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave: false, //required
		saveUninitialized: false //required
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/user', userRoutes)
app.use("/todoitems", toDoItemRoutes)

app.listen(PORT, () => {
    console.log('server up')
})