require('dotenv').config({path:"config/config.env"})
const express = require("express");
const userRoutes  = require("./routes/userRoutes");
const groceryRoutes = require("./routes/groceryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');

app.use("/myapp/stripe", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cors());
app.use("/myapp",userRoutes);
app.use("/myapp",groceryRoutes);
app.use("/myapp",orderRoutes);
app.use("/myapp",reportRoutes);

app.listen(8082, () => {
  console.log("Server Started");
});
