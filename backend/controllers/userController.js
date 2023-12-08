// const { set, ref, getDatabase } = require("firebase/database");
const app = require("../config/firebaseConfig");
// const {db} = require("../config/firebaseConfig");
const { dbF } = require("../config/firebaseConfig");
// const {User} = require("firebase/auth")
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
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
    // const resp = await addDoc(dbRef, payload);
    console.log(userCredential.user);
    // await sendEmailVerification(auth.currentUser);
    if (userCredential) {
      res.status(201).send({
        success: true,
        message: "Successfully registered",
        user: userCredential.user.uid
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

let userArr = null;
exports.loadUser = async(req, res) => {
  console.log(req.body.email);
  try {
    const q = query(
      dbRef,
      where("email", "==", `${req.body.email}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      userArr = {...doc.data(),id:doc.id};
      // console.log(userArr)
    });
    // console.log(userArr)
   await res.status(200).send({
      // data: {
      success: true,
      userProfile: userArr,
      // },
    });
  } catch (error) {
    console.log(error)
  }
};

exports.logout = async (req, res) => {
  try {
    await signOut(auth).then(()=>{
      res.status(200).send({
        success:true,
        message:"Logout Success"
      })

    });
  } catch (error) {
    res.status(200).send({
      success: false,
      error,
    });
  }
};

exports.getAllUsers = async(req,res)=>{
  console.log("Req: ",req)
  console.log("Req User: ",req.user)
try {
  const data = await getDocs(dbRef);
  const items = data.docs.map((item) => {
    return {...item.data(),id:item.id}
  });
  if (items) {
    res.status(200).json({
      success:true,
      users:items
    })
  }
} catch (error) {
  
}
}