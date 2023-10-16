import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { api_url } from "../utils/api_url";
import { auth, db } from "../Admin/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const loginFormSchema = Yup.object().shape({
  phone: Yup.string()
  .required("Enter Phone No. with Country Code(+91)"),
});
const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const onSignIn = async (values) => {
    const { phone } = values;
    const dbRef = collection(db, "Users");
    let userExists = null;

    const q = query(dbRef, where("phone", "==", `${phone}`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        userExists = { ...doc.data() };
        // setUserD(doc.data())
      });
      if (userExists !== null) {
        navigation.navigate("LoginOTPAuth",{
          phoneNumber:phone
        })
      } else {
        alert("User doesn't exists. Kindly SignUp")
        navigation.navigate("SignUp")
      }
    
    // const payload = {
    //   email,
    //   password,
    // };
    // setLoading(true);
    // try {
    //   const resp = await signInWithEmailAndPassword(auth, email, password);
    //   // console.log(resp);
    // } catch (error) {
    //   alert("Invalid Credentials");
    // } finally {
    //   setLoading(false);
    // }
    // try {
    //   const data = await fetch(`${api_url}:8082/myapp/login`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });
    //   const resp = await data.json();
    //   // console.log(resp);
    //   if (resp.success) {
    //     ToastAndroid.show("SignIn successfull",ToastAndroid.LONG);
    //     // navigation.navigate("UserDetails");
    //   }
    //   else{
    //     Alert.alert("Invalid Credentials", "Pls try again", [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]);
    //   }
    //   // const {data} = await axios.post(
    //   //   "http://198.168.1.10:5000/myapp/login",
    //   //   {
    //   //     email,
    //   //     password,
    //   //   },
    //   //   { headers: { "Content-Type": "application/json" } }
    //   // );
    //   // const response = await data.json();
    //   // console.log(await data.json());

    // } catch (error) {
    //   Alert.alert("Invalid Credentials", "Pls try again", [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel",
    //     },
    //     { text: "OK", onPress: () => console.log("OK Pressed") },
    //   ]);
    // }
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.createAccountText}>Login</Text> */}
      <Text style={styles.createAccountText}>Hello, Welcome Back</Text>
      <Formik
        initialValues={{ phone:"" }}
        onSubmit={onSignIn}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
          /* and other goodies */
        }) => (
          <>
            <View>
              {/* <View style={{ gap: responsiveHeight(1.3) }}>
                <Text style={styles.labelFont}>Email</Text>
                <TextInput
                  style={
                    errors.email && errors.email
                      ? styles.inputNotValid
                      : styles.input
                  }
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder={`${
                    errors.email && errors.email ? errors.email : ""
                  }`}
                />
              </View>
              <View style={{ gap: responsiveHeight(1.3) }}>
                <Text style={styles.labelFont}>Password</Text>
                <TextInput
                  style={
                    errors.password && errors.password
                      ? styles.inputNotValid
                      : styles.input
                  }
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder={`${
                    errors.password && errors.password ? errors.password : ""
                  }`}
                />
              </View> */}
                 <View style={{ gap: responsiveHeight(1.3) }}>
                <Text style={styles.labelFont}>Phone</Text>
                <TextInput
                  style={
                    errors.phone && errors.phone
                      ? styles.inputNotValid
                      : styles.input
                  }
                  keyboardType="phone-pad"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  placeholder={`${
                    errors.phone && errors.phone ? errors.phone : ""
                  }`}
                />
              </View>
              <View style={{ marginTop: responsiveHeight(2) }}>
                <TouchableOpacity
                  style={styles.createAccountBtn}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Login"
                >
                  <Text style={styles.createAccountBtnText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
            <View>
              <Text style={styles.ORText}>OR LOGIN WITH</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
          </View> */}
          {/* <View style={{ flexDirection: "row", gap: responsiveWidth(3) }}>
            <TouchableOpacity style={styles.googleBtn} onPress={googleSignUp}>
              <Text style={styles.googleTxt}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleBtn} onPress={googleSignUp}>
              <Text style={styles.googleTxt}>Phone</Text>
            </TouchableOpacity>
         
          </View> */}
          <View style={styles.alreadyAccountContainer}>
            <Text style={styles.alreadyAccountText}>
              Don't Have an Account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.loginText}>SignUp</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(10),
    marginRight: responsiveWidth(10),
    gap: responsiveHeight(3),
  },
  createAccountText: {
    fontSize: responsiveFontSize(3.5),
    fontFamily:"Poppins-Bold"
  },
  labelFont: {
    fontSize: responsiveFontSize(2.5),
    fontFamily:"Poppins-Bold"
  },
  input: {
    width: responsiveWidth(85),
    height: responsiveHeight(6.5),
    borderRadius: 10,
    backgroundColor: "#EDEDED",
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontFamily:"Poppins-SemiBold"
  },
  inputNotValid: {
    width: responsiveWidth(85),
    height: responsiveHeight(6.5),
    borderRadius: 10,
    backgroundColor: "#EDEDED",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderColor: "red",
    borderWidth: 1,
    fontFamily:"Poppins-SemiBold"
  },
  createAccountBtn: {
    backgroundColor: "#2DDC4A",
    borderRadius: 10,
    width: responsiveWidth(80),
    height: responsiveHeight(6.5),
    alignItems: "center",
    justifyContent: "center",
  },
  createAccountBtnText: {
    color: "white",
    fontFamily:"Poppins-Bold",
    fontSize: responsiveFontSize(2.3),
  },
  ORText: {
    width: 120,
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
  },
  alreadyAccountContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: responsiveWidth(1),
  },
  alreadyAccountText: {
    color: "gray",
    fontSize: responsiveFontSize(2.3),
    fontFamily:"Poppins-SemiBold"
  },
  loginText: {
    color: "#2DDC4A",
    fontSize: responsiveFontSize(2.3),
    fontFamily:"Poppins-Bold"
  },
  googleBtn: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    width: responsiveWidth(40),
    height: responsiveHeight(6.5),
    alignItems: "center",
    justifyContent: "center",
  },
  googleTxt: {
    color: "black",
    fontWeight: "900",
    fontSize: responsiveFontSize(2.3),
  },
});
export default Login;
