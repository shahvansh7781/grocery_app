import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";

export default function AllOrdersDetail() {
  const route = useRoute();
  const data = route.params.data;
  const orderStatus = route.params.data.status;
  const orderId = route.params.id;
  // console.log(data);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.card}>
          <View>
            <Image
              source={{ uri: "" + item.image }}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>Count : {item.count} </Text>
            <Text style={styles.cardPrice}>Price : Rs. {item.price} </Text>
            <Text style={styles.cardPrice}>
              Total : Rs. {item.count * item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* {
                data.map((itemData) => (
                    <TouchableOpacity key={itemData.id}>
                    <View style={styles.card}>
                        <View>
                        <Image
                            source={{ uri: "" + itemData.image }}
                            resizeMode="cover"
                            style={styles.cardImg}
                        />
                        </View>
                        <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>{itemData.title}</Text>
                        <Text style={styles.cardPrice}>Rs. {itemData.price}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                ))
                } */}

      <View style={styles.cardUser}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.totalText}>User Name : </Text>
          <Text style={styles.totalPrice}>{data.userName}</Text>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.totalText}>Emai ID : </Text>
          <Text style={styles.totalPrice}>{data.userEmail}</Text>
        </View>
      </View>
      <View></View>

      <View style={styles.cardAddress}>
        <Text
          style={{
            marginBottom: responsiveHeight(1),
            fontSize: responsiveFontSize(2.4),
            fontWeight: "bold",
          }}
        >
          Shipping Address :{" "}
        </Text>
        <Text>{data.shippingAddress}</Text>
        <Text
          style={{
            marginBottom: responsiveHeight(1),
            fontSize: responsiveFontSize(2.4),
            fontWeight: "bold",
          }}
        >
          Order Status:{" "}
          <Text
            style={{ fontSize: responsiveFontSize(2), fontWeight: "normal" }}
          >
            {orderStatus}
          </Text>
        </Text>
      </View>

      <FlatList
        style={styles.scrollableSection}
        data={data.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>

      <View style={styles.cardTotal}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.totalText}>Sub Total : </Text>
          <Text style={styles.totalPrice}>{data.subTotal}</Text>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.totalText}>Delievery Charge : </Text>
          <Text style={styles.totalPrice}>{data.deliveryCharge}</Text>
        </View>

        {/* Horizontal line */}
        <View style={styles.line}></View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.totalText}>Grand Total : </Text>
          <Text style={styles.totalPrice}>{data.grandTotal}</Text>
        </View>
      </View>
      <View>
        {
          orderStatus==='Dispatched' ? (<>
          <TouchableOpacity style={styles.uploadBtn} onPress={()=>{Alert.alert(
                    'Confirmation',
                    'Update Order Status to Delivered?',
                    [
                      {
                        text: 'No',
                        onPress: () => {
                          // Handle Cancel button press
                          console.log('Confirm No pressed');
                          alert("Order Status not Changed")
                        },
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: async() => {
                          // Handle OK button press
                          
                          console.log('Confirm Yes pressed');
                          const orderDocToUpdate = doc(db,'Orders',orderId);
                          
                          await updateDoc(orderDocToUpdate,{
                            status:"Delivered"
                          })
                          alert(`Order status changed to Delivered successfully`)
                          navigation.navigate("Home")
                        },
                      },
                    ],
                    { cancelable: false }
                  );}}>

                      <Text>Update Order Status</Text>
              </TouchableOpacity>
          </>):(<></>)
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    flexDirection: "row",
    width: responsiveWidth(90),
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 4,
    //   marginTop: responsiveHeight(3),
    borderRadius: 10,
    height: responsiveHeight(12),
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
    fontSize: responsiveFontSize(1.4),
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
  scrollableSection: {
    flex: 0.3,
    // height: "100%", // Take the other half of the available width
    backgroundColor: "white",
    padding: 15,
  },

  cardTotal: {
    flex: 0.4,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: responsiveHeight(0.5),
    borderRadius: 10,

    marginBottom: 10,
  },
  cardUser: {
    flex: 0.2,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: responsiveHeight(0.5),
    borderRadius: 10,
    marginTop: 10,
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
  cardAddress: {
    flex: 0.3,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    padding: responsiveWidth(2),
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
