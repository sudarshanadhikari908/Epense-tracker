const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const userRoute = require("./routes/users/userRoute");
const incomeRoute = require("./routes/income/incomeRoute");
const expenseRoute = require("./routes/expenses/expenseRoute");

const app = express();

// env filename
dotenv.config();

// dbCOnnect
dbConnect();

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to expense tracker api" });
});

// users routes
app.use("/api/users", userRoute);

// income route

app.use("/api/income", incomeRoute);

// expense route
app.use("/api/expenses", expenseRoute);

// Error
app.use(notFound);
app.use(errorHandler);

module.exports = app;
