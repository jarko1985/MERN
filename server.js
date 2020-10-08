require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRouter = require("./routes/userRouter");
const flightRouter = require("./routes/flightRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.use("/api/flights", flightRouter);

const URI = process.env.MONGO_URI;

mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Started on PORT", PORT);
});
