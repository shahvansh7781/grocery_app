import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { CartCard } from "./Cards/CartCard";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import axios from "axios";
import { api_url } from "../utils/api_url";

export function Cart({navigation}) {
  const data = useSelector((state) => state.Cart);
  const reqUser = useSelector((state) => 
    state.users.user
  );
  // const navigation = useNavigation();

  const [subTotal, setSubTotal] = useState(0);

  // Calculate subtotal when data changes
  useEffect(() => {
    let total = 0;
    data.forEach((item) => {
      total += item.price * item.count;
    });
    setSubTotal(total);

    // console.log('useEffect')
    // console.log(data[0].count)
  }, [data]);

  const renderItem = ({ item }) => {
    return <CartCard itemData={item}></CartCard>;
  };
  const handleCheckout = async() => {
    // console.log(reqUser ? reqUser:"Not");
    const payload = {
      items:data,
      total:subTotal,
      user:reqUser && reqUser.userData.email
    }
    // console.log(payload);
    // console.log(data);
    // console.log(reqUser && reqUser);
    try {
      const dataRep = await axios.post(`${api_url}:8082/myapp/createOrder`,payload,{
        headers: { "Content-Type": "application/json" },
      })
      // console.log(await dataRep.json());
      // console.log(dataRep)
      if (dataRep.data.myResponse.success) {
        alert("Order Success");
        navigation.navigate("Home")
      }
    } catch (error) {
      
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Cart</Text>
      </View>

      {/* <View style={styles.flatListContainer}> */}
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          style={styles.scrollableSection}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </SafeAreaView>
      {/* </View> */}

      {/* <TouchableOpacity>
        <View>
          <Text
            style={styles.addmore}
            onPress={() => {
              navigation.push("Home");
            }}
          >
            {" "}
            + Add More Items
          </Text>
        </View>
      </TouchableOpacity> */}

      <View style={styles.card}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.totalText}>Sub Total : </Text>
          <Text style={styles.totalPrice}>{subTotal}</Text>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.totalText}>Delievery Charge : </Text>
          <Text style={styles.totalPrice}>{10}</Text>
        </View>

        {/* Horizontal line */}
        <View style={styles.line}></View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.totalText}>Grand Total : </Text>
          <Text style={styles.totalPrice}>{subTotal + 10}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            handleCheckout();
          }}
        >
          <Text>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "#fff",
    elevation: 5,
    paddingLeft: 20,
    justifyContent: "center",
    marginTop: "7%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "800",
  },
  flatListContainer: {
    flex: 0.6, // Set the height of FlatList to 50% of the parent container
  },
  addmore: {
    color: "green",
    fontSize: responsiveFontSize(3),
    marginLeft: "5%",
    // marginTop: "10%",
    marginBottom: "3%",
    // backgroundColor: "white",
    width: "65%",
    borderRadius: 10,
  },
  card: {
    flex: 0.3,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,

    marginBottom: 10,
  },

  totalText: {
    fontSize: 18,
    margin: "1%",
    marginLeft: 25,
  },
  totalPrice: {
    fontSize: 16,
    margin: "1%",
    marginRight: 25,
    color: "gray",
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
  },
  uploadBtn: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "4%",
    backgroundColor: "#06FF00",
  },
});
