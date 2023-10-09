const express = require("express");
const userRoutes  = require("./routes/userRoutes");
const groceryRoutes = require("./routes/groceryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();

app.use(express.json());
app.use("/myapp",userRoutes);
app.use("/myapp",groceryRoutes);
app.use("/myapp",orderRoutes);

app.listen(8082, () => {
  console.log("Server Started");
});
