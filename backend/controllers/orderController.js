const { addDoc, collection } = require("firebase/firestore");
const { dbF } = require("../config/firebaseConfig");
const { getAuth } = require("firebase/auth");

const auth = getAuth();
const dbRef = collection(dbF, "Orders");
exports.createOrder = async (req, res) => {
  // const user = auth.currentUser;
  try {
    const resp = await addDoc(dbRef, req.body);
    // console.log(user);
    // console.log(req.body);
    // if (resp) {
      res.status(201).send({
        myResponse:{

          success: true,
          message: "Order created successfully",
          orderId:resp.id
        }
        // id: resp.id,
      });
    // }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Order failed",
    });
  }
};
