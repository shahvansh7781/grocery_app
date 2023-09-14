const app = require("../config/firebase");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} = require("firebase/auth");
const auth = getAuth();
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(auth.currentUser);
    if (userCredential) {
      res.status(201).send({
        success: true,
        message: "Successfully registered",
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
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    // console.log(user._tokenResponse.idToken);

    res.status(200).send({
      success: true,
      message: "Login Success",
    });
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
