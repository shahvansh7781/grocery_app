require('dotenv').config({path:"config/config.env"})
const express = require("express");
const userRoutes  = require("./routes/userRoutes");
const groceryRoutes = require("./routes/groceryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();
const cors = require('cors');

app.use("/myapp/stripe", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cors());

// app.post("/stripe",async(req,res)=>{
//   const sig = req.headers["stripe-signature"];
//   let event;
//   try {
//     event = await stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: err.message });
//   }
//   // console.log(event.data.object)
//   // Event when a payment is initiated
//   if (event.type === "payment_intent.created") {
//     console.log(`${event.data.object.metadata.userName} initated payment!`);
//   }
//   // Event when a payment is succeeded
//   if (event.type === "payment_intent.succeeded") {
//     console.log(`${event.data.object.metadata.userName} succeeded payment!`);
//     // fulfilment
//   }
//   res.json({ ok: true });
// })
app.use("/myapp",userRoutes);
app.use("/myapp",groceryRoutes);
app.use("/myapp",orderRoutes);

app.listen(8082, () => {
  console.log("Server Started");
});
