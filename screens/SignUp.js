import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
const SignUp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.createAccountText}>Create an Account</Text>
      <View style={{ gap: responsiveHeight(2.5) }}>
        <View style={{ gap: responsiveHeight(1) }}>
          <Text style={styles.labelFont}>Name</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={{ gap: responsiveHeight(1) }}>
          <Text style={styles.labelFont}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
          ></TextInput>
        </View>
        <View style={{ gap: responsiveHeight(1) }}>
          <Text style={styles.labelFont}>Password</Text>
          <TextInput style={styles.input} secureTextEntry={true}></TextInput>
        </View>
        <View style={{ gap: responsiveHeight(1) }}>
          <Text style={styles.labelFont}>Phone</Text>
          <TextInput style={styles.input} keyboardType="numeric"></TextInput>
        </View>
        <View style={{ marginTop: responsiveHeight(2) }}>
          <TouchableOpacity style={styles.createAccountBtn}>
            <Text
              style={styles.createAccountBtnText}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
          <View>
            <Text style={styles.ORText}>OR</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
        </View>
        <View>
          <TouchableOpacity
            style={styles.googleBtn}
          >
            <Text
              style={styles.googleTxt}
            >
              Signup with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.alreadyAccountContainer}>
        <Text style={styles.alreadyAccountText}>Already Have an Account?</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}><Text style={styles.loginText}>Login</Text></TouchableOpacity>
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
    gap: responsiveHeight(4),
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
  googleBtn:{
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
  }
});
export default SignUp;
