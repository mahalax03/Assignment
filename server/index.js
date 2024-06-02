const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Router = require("../server/Routes/routes");
const PORT = 3000;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use(Router);

try {
  mongoose
    .connect(
      "mongodb+srv://maha:31122003@cluster0.3sxtczw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(console.log("CONNECTED TO MONGODB CLUSTER"));
} catch (error) {
  console.log(error);
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});
app.get("/", (req, res) => {
  res.send("RUNNING SUCCESSFULLY");
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED at PORT : ${PORT}`);
});

module.exports = app;
