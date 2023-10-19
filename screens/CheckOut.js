import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { StyleSheet ,FlatList,Dimensions} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { api_url } from '../utils/api_url';
import { useStripe } from '@stripe/stripe-react-native';
import { deleteAll } from '../Reducers/CartReducers';
import { db } from '../Admin/config';
import { getWalletCoins } from '../Reducers/OrderReducer';

export default function CheckOut() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [deliveryCharge,setDeliveryCahrge]=useState(0)
  // const [address,setAddress]=useState('')

  const dispatch=useDispatch()
  const navigation=useNavigation()
  const route=useRoute()

  const data=route.params.data
  let subTotal=route.params.subTotal
  const userEmail = route.params.userEmail;
  const userName = route.params.userName;
  const userId = route.params.userId;
  const walletCoins = route.params.walletCoins;

  // console.log(data)

  const addressData=useSelector((state) => state.Address)
  console.log(addressData)
  
  
  const { height: screenHeight } = Dimensions.get('window');

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers
  
    // Convert latitude and longitude from degrees to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
  
    // Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Calculate the distance in kilometers
    const distanceKm = earthRadiusKm * c;


    setDeliveryCahrge(Math.round(distanceKm*5))
  
    return distanceKm;
  }
  
  // Helper function to convert degrees to radians
  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  

  useEffect(()=>{

    // Example usage
  const distance = calculateDistance(22.3124684,73.1786956,addressData.coords.latitude,addressData.coords.longitude); // Berlin to Paris
  console.log(`Distance: ${distance.toFixed(2)} kilometers`);
    
  },[dispatch,addressData])
  
  

  const renderItem = ({ item }) => {
    return (
      

        <View style={{ justifyContent: 'space-between', flexDirection: "row" }}>
          <Text style={styles.totalText}>{item.title} </Text>
          <Text style={styles.totalPrice}> {item.count} * {item.price} ={item.count * item.price}</Text>
        </View>
       
      
    );
  };

  // useEffect(()=>{
  //   stringAddress(coords)
  // },[coords,dispatch])
   
  
  // useEffect(() => {
  //   if (selectedLocation) {
  //     // Use built-in reverse geocoding capabilities
  //     // Note: This example is for Android; iOS has a similar capability
  //     const { latitude, longitude } = selectedLocation;
  //     fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const address = data.display_name;
  //         setSelectedAddress(address);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching address:', error);
  //       });
  //   }
  // }, [selectedLocation]);

  // const handleMapPress = (event) => {
  //   const { coordinate } = event.nativeEvent;
  //   setSelectedLocation(coordinate);
  //   // console.log(selectedLocation)
  // };

  // const stringAddress=async(coords)=>{

  //   if (coords) {
  //     // Handle the case where coords is null or undefined
  //     try {
  //       const response = await axios.get(
  //         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
  //       );
  
  //       console.log(response.data)
  
  //       if (response.data && response.data.display_name) {
  //         // setAddress(response.data.display_name);
  //         const temp_addr=response.data.address.city+','+response.data.address.state +','+response.data.address.country//+','+response.data.address.postcode
  //         setAddress(temp_addr)
  //       } else {
  //         setAddress('Address not found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching address:', error);
  //       setAddress('Address not found');
  //     }
  //   }

  //   console.log(coords.latitude)
   
  //   // axios
  //   // .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`)
  //   // .then((response) => {
  //   //   // Handle the successful response here
  //   //   console.log(response.data);
  //   //   setAddress(response.data.display_name)
  //   //   // ...
  //   // })
  //   // .catch((error) => {
  //   //   // Handle errors here
  //   //   console.error('Error fetching address:', error);
  //   // });
  
  // }
  const stripe = useStripe();
  
  const handleChangeAddr=()=>{
    console.log('checkout')
    navigation.navigate('Map')
    
  }
let isCoinsUsed = false;
  const handlePayment = async()=>{
    console.log('Payment Stripe');
    if (walletCoins!=0) {
      Alert.alert(
        'Confirmation',
        `You have ${walletCoins} coins in your Wallet. You will save ${walletCoins} on this order. Do you want to use coins?`,
        [
          {
            text: 'No',
            onPress: () => {
              // Handle Cancel button press
              console.log('Confirm No pressed');
              handleFinalPayment(subTotal)
            },
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async() => {
              // Handle OK button press
              
              console.log('Confirm Yes pressed');
              subTotal=subTotal-walletCoins;
              isCoinsUsed=true;
              handleFinalPayment(subTotal)
            },
          },
        ],
        { cancelable: false }
      );
    }
    else{
      handleFinalPayment(subTotal);
    }
  }
  const handleFinalPayment = async(subTotal)=>{
    const payload = {
      items:data,
      userName,
      userEmail,
      subTotal,
      deliveryCharge,
      grandTotal:subTotal+deliveryCharge,
      shippingAddress:addressData.address.addr,
      savings:walletCoins,
      status:"Dispatched"
    }
    try {
      const dataRep = await axios.post(`${api_url}:8082/myapp/createOrder`,payload,{
        headers: { "Content-Type": "application/json" },
      })
      // const data = await dataRep.json();
      console.log(dataRep.data.clientSecret)
      const clientSecret = dataRep.data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret:clientSecret,
        merchantDisplayName: 'GrocerExpress',
        googlePay:true
      })
      
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret
      })
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      alert("Payment success! Order Placed")
      
      if (isCoinsUsed) {
        const docToUpdate = doc(db, "Users", userId);
      await updateDoc(docToUpdate, {
        walletCoins: 0,
      });
      dispatch(getWalletCoins(0))
      }
      navigation.navigate("UserDetails")
      dispatch(deleteAll());
      // console.log(await dataRep.json());
      // console.log(dataRep)
      // if (dataRep.data.myResponse.success) {
      //   alert("Order Success");
      //   navigation.navigate("Home")
      // }
    } catch (error) {
      console.log(error)
      alert("Order Failed",error);
      
    }
  }
  return (
    <View  style={styles.container}>


            <View style={styles.card}>

                    
                    <FlatList
                      data={data}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                      style={{ height: screenHeight * 0.5 }} // Set FlatList height to 20% of the screen height
                    />
                   

                    
                    <View style={styles.line}></View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={styles.totalText}>Sub Total : </Text>
                        <Text style={styles.totalPrice}>{subTotal}</Text>
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={styles.totalText}>Delivery Charge : </Text>
                        <Text style={styles.totalPrice}>{deliveryCharge}</Text>
                    </View>

                    {/* Horizontal line */}
                    <View style={styles.line}></View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={styles.totalText}>Grand Total : </Text>
                        <Text style={styles.totalPrice}>{subTotal + deliveryCharge}</Text>
                    </View>

                    
                </View>

                <View style={styles.cardAddress}>

                  <Text style={{color:'#2DDC4A',marginBottom:responsiveHeight(1),fontFamily:"Poppins-SemiBold"}}>Order Will Be Deliver To : </Text>
                  <Text style={{fontFamily:"Poppins-SemiBold"}}>{addressData.address.addr}</Text>
                  
                </View>

                {/* <View>
                 <TouchableOpacity  onPress={()=>{
                  navigation.navigate('Map')
                 }}>
                  <Text>Change</Text>
                 </TouchableOpacity>
                </View> */}

      <View>
        <TouchableOpacity style={styles.addreText}>
            <Text style={{ color:'black',fontSize:responsiveFontSize(2.5),fontFamily:"Poppins-SemiBold"}} 
            onPress={handleChangeAddr}>Change Address</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.uploadBtn} onPress={handlePayment}>
          <Text style={{fontFamily:"Poppins-SemiBold",color:"white"}}>Pay ₹{subTotal+deliveryCharge}</Text>
        </TouchableOpacity>
      </View>

               
                {/* <View>
                  <TouchableOpacity onPress={()=>{}}>Change</TouchableOpacity>
                </View> */}
      {/* <View style={{}}>
        <Text>Select your location on the map:</Text>
        <MapView
          style={{ width: '100%',height: screenHeight * 0.2}}
          onPress={handleMapPress}
        >
          {selectedLocation && (
            <Marker coordinate={selectedLocation} />
          )}
        </MapView>
        {selectedAddress && (
          <Text>Selected Address: {selectedAddress}</Text>
        )}
      </View> */}
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
  },
  card: {
    flex: 0.75,
  
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
    fontFamily:"Poppins-SemiBold"
  },
  totalPrice: {
    fontSize: 16,
    margin: "1%",
    marginRight: 25,
    color: "gray",
    fontFamily:"Poppins-SemiBold"
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
    // borderWidth: 0.5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2DDC4A",
  },
  // item: {
  //   flexDirection: "row", // Make items horizontally aligned
  //   justifyContent: "space-between", // Space evenly
  //   backgroundColor: 'white',
  //   padding: responsiveWidth(2),
  //   // marginVertical: 8,
  //   // marginHorizontal: 16,
  // },
  // itemColumn: {
  //   width: '50%', // Allocate 25% width to each column
  // },
  cardAddress: {
    flex: 0.20,
  
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    padding:responsiveWidth(2),
    
  },
  addreText:{
    
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center' ,
    width: "94%",
    marginBottom:responsiveHeight(2),
    marginTop:responsiveHeight(2),

    fontFamily:"Poppins-SemiBold"
  }
});