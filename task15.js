const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require("./routes/task15b");
app.use("/users", userRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});