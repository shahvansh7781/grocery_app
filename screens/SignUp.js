import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  ToastAndroid
} from "react-native";
import React, { useEffect } from "react";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as Yup from "yup";
import { Formik } from "formik";

// import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";

const signUpFormSchema = Yup.object().shape({
  Name: Yup.string().max(30, "Name should be less than 30 chars").required("Name should not be empty"),
  email: Yup.string().email().required("Email should not be empty"),
  password: Yup.string().min(8, "Password should be of 8 chars").required("Password should not be empty"),
  phone: Yup.string().length(10, "Phone should be of 10 chars").required("Phone No. should not be empty"),
});

const SignUp = ({ navigation }) => {
  // useEffect(() => {
    
  // GoogleSignin.configure({webClientId:"11139080005-ktk42659aqapvu153r4bkfbkj1gifpgu.apps.googleusercontent.com"});
   
  // }, [])
  
 
  const onSignUp = async (values) => {
    const { email, password,Name,phone } = values;
    const payload = {
      email,
      password,
      Name,
      phone
    };
    try {
      // await createUserWithEmailAndPassword(auth,email, password);
      // ToastAndroid.show("SignUp successfull",ToastAndroid.LONG);
      // await sendEmailVerification(auth.currentUser);
      const data = await fetch(`http://192.168.1.3:8082/myapp/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(await data.json());
      ToastAndroid.show("Email Verification link has been send to your Email. Kindly Verify It.",ToastAndroid.LONG);
      navigation.navigate("Login");
    } catch (error) {
     Alert.alert("SignUp Failed");
    }
  };
  const googleSignUp = async()=>{
    try {
      const data = await fetch(`http://192.168.1.10:8082/myapp/googleSignUp`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(await data.json());
    } catch (error) {
      
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.createAccountText}>Create an Account</Text>
      <Formik
        initialValues={{ Name: "", email: "", password: "", phone: "" }}
        onSubmit={onSignUp}
        validationSchema={signUpFormSchema}
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
            <View style={{ gap: responsiveHeight(2) }}>
              <View style={{ gap: responsiveHeight(1.3) }}>
                <Text style={styles.labelFont}>Name</Text>
                <TextInput
                  style={errors.Name && errors.Name?styles.inputNotValid:styles.input}
                  onChangeText={handleChange("Name")}
                  onBlur={handleBlur("Name")}
                  value={values.Name}
                  placeholder={`${errors.Name && errors.Name?errors.Name:""}`}
                />
              </View>
              <View style={{ gap: responsiveHeight(1.3) }}>
                <Text style={styles.labelFont}>Email</Text>
                <TextInput
                  style={errors.email && errors.email?styles.inputNotValid:styles.input}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder={`${errors.email && errors.email?errors.email:""}`}
                />
              </View>
              <View style={{ gap: responsiveHeight(1.3) }}>
                <Text style={styles.labelFont}>Password</Text>
                <TextInput
                  style={errors.password && errors.password?styles.inputNotValid:styles.input}
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder={`${errors.password && errors.password?errors.password:""}`}
                />
              </View>
              <View style={{ gap: responsiveHeight(1.3) }}>
                <Text style={styles.labelFont}>Phone</Text>
                <TextInput
                  style={errors.phone && errors.phone?styles.inputNotValid:styles.input}
                  keyboardType="numeric"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  placeholder={`${errors.phone && errors.phone?errors.phone:""}`}
                />
              </View>

              <View style={{ marginTop: responsiveHeight(2) }}>
                <TouchableOpacity
                  style={styles.createAccountBtn}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Create Account"
                >
                  <Text style={styles.createAccountBtnText}>
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
        <View>
          <Text style={styles.ORText}>OR</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
      </View>
      <View>
        <TouchableOpacity style={styles.googleBtn} onPress={googleSignUp}>
          <Text style={styles.googleTxt}>Signup with Google</Text>
        </TouchableOpacity>
        {/* <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={googleSignUp}/> */}
      </View>
      <View style={styles.alreadyAccountContainer}>
        <Text style={styles.alreadyAccountText}>Already Have an Account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: responsiveHeight(4),
    marginLeft: responsiveWidth(10),
    marginRight: responsiveWidth(10),
    gap: responsiveHeight(2.5),
  },
  createAccountText: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: "900",
  },
  labelFont: {
    fontSize: responsiveFontSize(2),
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
    borderColor:"red",
    borderWidth:1
  },
  createAccountBtn: {
    backgroundColor: "#2DDC4A",
    borderRadius: 10,
    width: responsiveWidth(80),
    height: responsiveHeight(6.5),
    alignItems: "center",
    justifyContent: "center",
  },
  createAccountBtnText:{
    color: "white",
    fontWeight: "900",
    fontSize: responsiveFontSize(2.3),
  },
  ORText: {
    width: 50,
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
    width: responsiveWidth(80),
    height: responsiveHeight(6.5),
    alignItems: "center",
    justifyContent: "center",
  },
  googleTxt:{
    color: "black",
    fontWeight: "900",
    fontSize: responsiveFontSize(2.3),
  },
});
export default SignUp;
