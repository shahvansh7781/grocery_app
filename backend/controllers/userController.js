// const { set, ref, getDatabase } = require("firebase/database");
const app = require("../config/firebaseConfig");
// const {db} = require("../config/firebaseConfig");
const { dbF } = require("../config/firebaseConfig");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} = require("firebase/auth");
const {
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
} = require("firebase/firestore");
const auth = getAuth();
const dbRef = collection(dbF, "Users");
exports.registerUser = async (req, res) => {
  const { email, Name, password, phone } = req.body;
  const payload = {
    email,
    Name,
    phone,
    role: "User",
  };

  try {
    // const queryF = query(dbRef,where("email","==",`${email}`));
    // if (queryF) {
    //   res.status(404).send({
    //     success: false,
    //     error: "User already Exists",
    //   });
    // }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const resp = await addDoc(dbRef, payload);

    // await sendEmailVerification(auth.currentUser);
    if (userCredential) {
      res.status(201).send({
        success: true,
        message: "Successfully registered",
        user: resp.id,
      });
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  let userArr = {};
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    // console.log(user._tokenResponse.email);
    const q = query(
      dbRef,
      where("email", "==", `${user._tokenResponse.email}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      userArr = doc.data();
    });
    // console.log(user);
    if (user) {
    res.status(200).send({
      // data: {
      success: true,
      message: "Login Success",
      userDetails: userArr,
      // },
    });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      error,
    });
  }
};

// exports.googleSignUp = async (req, res) => {
//   const provider = new GoogleAuthProvider();
//   try {
//     const result = await signInWithPopup(auth, provider);
//     console.log(result);
//     if (result) {
//       res.status(200).send({
//         success: true,
//       });
//     }
//   } catch (error) {
//     res.status(400).send({
//       error
//     })
//   }
// };
