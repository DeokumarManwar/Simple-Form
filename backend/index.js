const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose"); // Change this line

require("dotenv/config");

app.listen(process.env.PORT || 4000, () => {
  console.log("Listening to port 4000");
});

app.use(cors()); // Use cors() as middleware without any arguments
app.use(express.json());

// user routes
const userRoute = require("./routes/user");
app.use("/api/users/", userRoute);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });

mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (e) => console.log(`ERROR: ${e}`));
