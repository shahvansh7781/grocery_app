const express = require("express");
const userRoutes  = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use("/myapp",userRoutes);

app.listen(5000, () => {
  console.log("Server Started");
});
