const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require("./config/dbConnect")
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')


const userRoute = require('./routes/users/userRoute')


const app = express()

// env filename
dotenv.config()

// dbCOnnect
dbConnect()

// middleware
app.use(express.json());

// routes
app.use("/api/users", userRoute);
 

// Error
app.use(notFound)
app.use(errorHandler )


module.exports = app;

