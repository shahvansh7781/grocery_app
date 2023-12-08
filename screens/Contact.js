import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";

export default function Contact() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: responsiveFontSize(3.5),
            marginTop: 15,
            marginLeft: responsiveWidth(25),
            color: "#2DDC4A",
          }}
        >
          About Us
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: responsiveFontSize(2),
            marginLeft: 10,
          }}
        >
          The mobile grocery application revolutionizes the traditional shopping
          experience.Our objective is to create a user-friendly, efficient, and
          feature-rich mobile application that simplifies the grocery shopping
          experience. The application is designed to cater to the evolving needs
          of modern consumers, offering a comprehensive solution for managing
          shopping lists, making purchases, and receiving personalized
          recommendations.{"\n"}{"\n"}
          The application boasts an intuitive user interface,
          allowing users to effortlessly browse through an extensive product
          catalog, add items to their shopping cart, and complete transactions
          securely. Real-time inventory updates and an intelligent search
          algorithm further enhance the user experience. The mobile grocery
          application holds the potential to redefine how consumers engage with
          grocery shopping, offering a convenient and tailored solution that
          aligns with contemporary lifestyles.
        </Text>

        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins-Bold",
              fontSize: responsiveFontSize(2.5),
            }}
          >
            Shop Now !
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContact}>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: responsiveFontSize(3.5),
            marginTop: 15,
            color: "#2DDC4A",
            alignSelf:"center"
          }}
        >
          Contact Us
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: responsiveFontSize(2.2),
            marginLeft: 10,
          }}
        >
        Email : grocerExpress@gmail.com
        {/* <Text style={{fontFamily:"Poppins-Bold"}}>  </Text> */}
        
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: responsiveFontSize(2.2),
            marginLeft: 10,
          }}
        >
          HelpLine : 1800 890 1222
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  card: {
    flex: 0.7,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 4,
    // marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: responsiveHeight(1),
    padding: responsiveWidth(4),
    fontFamily: "Poppins-SemiBold",
  },
  cardContact: {
    flex: 0.3,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 4,
    // marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: responsiveHeight(1),
    padding: responsiveWidth(4),
    fontFamily: "Poppins-SemiBold",
  },

  uploadBtn: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#2DDC4A",

    marginBottom: 20,
  },
});
