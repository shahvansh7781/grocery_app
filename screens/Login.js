import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { api_url } from "../utils/api_url";

const loginFormSchema = Yup.object().shape({
  email: Yup.string().required("Email should not be empty"),
  password: Yup.string().required("Password should not be empty"),
});
const Login = ({ navigation }) => {
  const onSignIn = async (values) => {
    const { email, password } = values;
    const payload = {
      email,
      password,
    };
    
    try {
      const data = await fetch(`${api_url}:8082/myapp/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const resp = await data.json();
      // console.log(resp);
      if (resp.success) {
        ToastAndroid.show("SignIn successfull",ToastAndroid.LONG);
        navigation.navigate("Home");
      }
      else{
        Alert.alert("Invalid Credentials", "Pls try again", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
      // const {data} = await axios.post(
      //   "http://198.168.1.10:5000/myapp/login",
      //   {
      //     email,
      //     password,
      //   },
      //   { headers: { "Content-Type": "application/json" } }
      // );
      // const response = await data.json();
      // console.log(await data.json());
     
    } catch (error) {
      Alert.alert("Invalid Credentials", "Pls try again", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };
  const googleSignUp = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    //   const { idToken } = await GoogleSignin.signIn();
    //   // console.log(userInfo);
    // } catch (error) {
    // }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.createAccountText}>Login</Text>
      <Text style={styles.createAccountText}>Hello, Welcome Back</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
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
            <View style={{ gap: responsiveHeight(4.5) }}>
              <View style={{ gap: responsiveHeight(1.3) }}>
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

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
        <View>
          <Text style={styles.ORText}>OR LOGIN WITH</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
      </View>
      <View style={{ flexDirection: "row", gap: responsiveWidth(3) }}>
        <TouchableOpacity style={styles.googleBtn} onPress={googleSignUp}>
          <Text style={styles.googleTxt}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleBtn} onPress={googleSignUp}>
          <Text style={styles.googleTxt}>Phone</Text>
        </TouchableOpacity>
        {/* <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={googleSignUp}/> */}
      </View>
      <View style={styles.alreadyAccountContainer}>
        <Text style={styles.alreadyAccountText}>Don't Have an Account?</Text>
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
    fontWeight: "900",
  },
  labelFont: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "900",
  },
  input: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    borderRadius: 10,
    backgroundColor: "#EDEDED",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  inputNotValid: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    borderRadius: 10,
    backgroundColor: "#EDEDED",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderColor: "red",
    borderWidth: 1,
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
    fontWeight: "900",
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
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.3),
  },
  loginText: {
    color: "#2DDC4A",
    fontSize: responsiveFontSize(2.3),
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
