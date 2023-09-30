import React, { Component, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { deletee, updateCount } from "../../Reducers/CartReducers";

import { useDispatch } from "react-redux";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export function CartCard({ itemData }) {
  const [count, setCount] = useState(itemData.count);
  const dispatch = useDispatch();

  // const handleUpdate=(event)=>{
  //     event.preventDefault()
  //     dispatch(update({id:id,title:utitle,desc:udesc}))
  //     navigate('/')
  // }

  const incCount = (event) => {
    // console.log('increment')

    if (count < itemData.stock) {
      const newCount = count + 1;
      setCount(newCount);
      dispatch(updateCount({ id: itemData.id, count: newCount }));
    }

    // event.preventDefault()
    // console.log('count',count)
  };
  const decCount = (event) => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      dispatch(updateCount({ id: itemData.id, count: newCount }));
    }
    // event.preventDefault()
  };

  const deleteFromCart = (id) => {
    dispatch(deletee({ id: id }));
  };
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.card}>
          <View>
            <Image
              source={{ uri: "" + itemData.image }}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            {/* <View style={{}}> */}

            <Text style={styles.cardTitle}>{itemData.title}</Text>
            <Text style={styles.cardPrice}>Rs. {itemData.price}</Text>
            {/* </View> */}

            <View style={{ flexDirection: "row",alignItems:"center" }}>
              <TouchableOpacity
                onPress={() => {
                  incCount();
                }}
              >
                <Image
                  source={require("../Cards/plus_cart.jpeg")}
                  style={styles.icon}
                ></Image>
              </TouchableOpacity>
              <Text style={styles.cardInfo}>{count}</Text>
              <TouchableOpacity
                onPress={() => {
                  decCount();
                }}
              >
                <Image
                  source={require("../Cards/minus_cart.jpeg")}
                  style={styles.icon}
                ></Image>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  deleteFromCart(itemData.id);
                }}
              >
                <Image
                  source={require("../Cards/delete.png")}
                  style={[styles.icon, { bottom: "2%", left: "90%" }]}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    width: responsiveWidth(90),
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: responsiveHeight(3),
    borderRadius: 10,
    height: responsiveHeight(15),
    marginBottom: responsiveHeight(1),
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  cardInfo: {
    margin: responsiveWidth(4),
  },
  cardTitle: {
    fontWeight: "bold",
    // display:"flex",
    // flexDirection:"row",
    // flexWrap:"wrap",
    fontSize: responsiveFontSize(2),
  },
  cardPrice: {
    fontWeight: "200",
    fontSize: responsiveFontSize(2),
    color: "gray",
  },
  cardDetails: {
    fontSize: responsiveFontSize(5),
    color: "#444",
  },
  icon: {
    width: responsiveWidth(7),
    height: responsiveHeight(3),
    margin: responsiveWidth(0.5),
  },
});
