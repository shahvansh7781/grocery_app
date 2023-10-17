import { View, Text ,StyleSheet,TouchableOpacity,Image,FlatList, Alert} from 'react-native'
import React from 'react'
import { responsiveHeight,responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Admin/config';
import { getWalletCoins } from '../Reducers/OrderReducer';

export default function MyOrdersDetail({navigation}) {

const route=useRoute()
const data=route.params.data
const orderId = route.params.id;
const orderStatus = route.params.data.status;
console.log('Helloo',data)

const role=route.params.role

const subTotal = data.subTotal;
const dispatch = useDispatch();
const user = useSelector((state)=>state.users.user)
const userProfile = useSelector((state) => state.users.userProfile);
const coins = userProfile && userProfile.walletCoins
const userId = user && user.userData.id;
const renderItem=({item})=>{
    return(
        <TouchableOpacity >
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
            <Text style={styles.cardPrice}>Total : Rs. {item.count * item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
}

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

                
                <View style={styles.cardAddress}>

                        <Text style={{marginBottom:responsiveHeight(1),fontSize:responsiveFontSize(2.4),fontFamily:"Poppins-SemiBold",}}>Shipping Address : </Text>
                        <Text style={{fontFamily:"Poppins-SemiBold"}}>{data.shippingAddress}</Text>

                </View>
                                

                
                 <FlatList
                  style={styles.scrollableSection}
                  data={data.items}
                  renderItem={renderItem}
                  keyExtractor={item=>item.id}>
                </FlatList> 

              

                <View style={styles.cardTotal}>
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <Text style={styles.totalText}>Sub Total : </Text>
                            <Text style={styles.totalPrice}>{data.subTotal}</Text>
                        </View>
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <Text style={styles.totalText}>Delievery Charge : </Text>
                            <Text style={styles.totalPrice}>{data.deliveryCharge}</Text>
                        </View>
                        {data.savings && <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <Text style={styles.totalText}>Savings : </Text>
                            <Text style={styles.totalPrice}>{data.savings}</Text>
                        </View>}
                        
                        {/* Horizontal line */}
                        <View style={styles.line}></View>
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <Text style={styles.totalText}>Grand Total : </Text>
                            <Text style={styles.totalPrice}>{data.grandTotal}</Text>
                        </View>
                    </View>
                <View>

                </View>


                {role==='User' && orderStatus==='Delivered' ? (


                  <TouchableOpacity style={styles.uploadBtn} onPress={()=>{Alert.alert(
                    'Confirmation',
                    'Are Groceries Fresh?',
                    [
                      {
                        text: 'No',
                        onPress: () => {
                          // Handle Cancel button press
                          console.log('Confirm No pressed');
                          alert("Your order is not returnable")
                        },
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: async() => {
                          // Handle OK button press

                          const dbRef = collection(db,"Users");

                          

                          
                          console.log(userId);
                          console.log('Confirm Yes pressed');
                          const docToUpdate = doc(db,"Users",userId)

                          const orderDocToUpdate = doc(db,'Orders',orderId);

                          // Coins earned will be 2% of SubTotal and While redeem 1 coin === Rs. 1
                          const walletCoins = Math.ceil(0.02*subTotal);
                          console.log(walletCoins);
                          //j
                          await updateDoc(docToUpdate,{
                            walletCoins:coins+walletCoins
                          })

                          dispatch(getWalletCoins(coins+walletCoins))
                          alert(`Your order is returned successfully and You will receive ${walletCoins} coins on this order`)
                          navigation.push("UserDetails")

                          await updateDoc(orderDocToUpdate,{
                            status:"Returned"
                          })
                          dispatch(getWalletCoins(coins+walletCoins))
                          alert(`Your order is returned successfully and You will receive ${walletCoins} coins on this order`)
                          navigation.navigate("Home")

                        },
                      },
                    ],
                    { cancelable: false }
                  );}}>


                      <Text>Return</Text>
              </TouchableOpacity>
                ):(<></>)}


                     

      
    


    </View>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white'
    },
    card: {
      flexDirection: "row",
      width: responsiveWidth(90),
      alignSelf: "center",
      backgroundColor: "#fff",
      elevation: 4,
    //   marginTop: responsiveHeight(3),
      borderRadius: 10,
      height: responsiveHeight(13.5),
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
      // fontWeight: "bold",
      fontFamily:"Poppins-SemiBold",
      // display:"flex",
      // flexDirection:"row",
      // flexWrap:"wrap",
      fontSize: responsiveFontSize(2),
    },
    cardPrice: {
      fontWeight: "200",
      fontSize: responsiveFontSize(1.4),
      color: "gray",
      fontFamily:"Poppins-SemiBold",
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
        flex:0.30,
        // height: "100%", // Take the other half of the available width
        backgroundColor: "white",
        padding: 15,
      },

    cardTotal: {
        flex: 0.5,
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        elevation: 4,
        marginTop:responsiveHeight(0.5),
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
       marginTop:responsiveHeight(0.5),
        borderRadius: 10,
    
        marginBottom: 10,
      },
    
      totalText: {
        fontSize: 18,
        margin: "1%",
        marginLeft: 25,
        fontFamily:"Poppins-SemiBold",
      },
      totalPrice: {
        fontSize: 16,
        margin: "1%",
        marginRight: 25,
        color: "gray",
        fontFamily:"Poppins-SemiBold",
      },
      line: {
        borderBottomWidth: 1,
        borderColor: "gray",
        marginVertical: 10,
      },
      cardAddress: {
        flex: 0.25,
      
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        elevation: 4,
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,
        padding:responsiveWidth(3)
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
  