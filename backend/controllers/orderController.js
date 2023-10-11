const {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} = require("firebase/firestore");
const { dbF } = require("../config/firebaseConfig");
const { getAuth } = require("firebase/auth");
const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);
const auth = getAuth();
const dbRef = collection(dbF, "Orders");

let payload = null;
exports.createOrder = async (req, res) => {
  // const user = auth.currentUser;
  const { userName, userEmail } = req.body;
  payload = req.body;
  // console.log(userName)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.grandTotal * 100,
      currency: "inr",
      payment_method_types: ["card"],
      metadata: { userName, userEmail },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment Initiated", clientSecret });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.myWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.userName} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.userName} succeeded payment!`);
    // fulfilment
    const resp = await addDoc(dbRef, payload);
    res.status(201).send({
      myResponse: {
        success: true,
        orderId: resp.id,
      },
    }).end();
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const data = await getDocs(dbRef);
    const items = data.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });
    if (items) {
      res.status(200).json({
        success: true,
        orders: items,
      });
    }
  } catch (error) {}
};

exports.getUserOrder = async (req, res) => {
  let orderData = null;
  try {
    const q = query(dbRef, where("userEmail", "==", `${req.body.email}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      orderData = { ...doc.data() };
      // setUserD(doc.data())
    });
    res.status(200).json({
      success: true,
      orderData,
    });
  } catch (error) {}
};
