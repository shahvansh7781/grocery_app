import React, { useState ,useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { fetchOrders } from '../../Reducers/OrderReducer';





const UserCard = ({itemData}) => {

  const navigation=useNavigation()
  const dispatch=useDispatch()


    const [filterData,setFilterData]=useState([])
    const data=useSelector((state)=>state.orders.data)
    const email=itemData.email
    // console.log(email,data)
    
    useEffect(() => {
      dispatch(fetchOrders())
      .then(() =>{dataFilter()}) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false
      });
    }, [dispatch]);
   

    const dataFilter=()=>{
        const filteredOrders = data.filter(order => order.userEmail === email);
        setFilterData(filteredOrders)
    }
    



  // console.log('From card',itemData)




 
 
 
  return (
   
    <View  style={styles.container}>
       
    <TouchableOpacity  
    onPress={()=>{navigation.navigate('MyOrders',{

        email:itemData.email,
        role:'Admin'
        
      })}}  >
      <View style={styles.card} >
        
        <View style={styles.cardInfo}>
          {/* <Text style={styles.cardTitle}>{itemData.title.length > 5 ? itemData.title.slice(0,10) + '...' : itemData.title}</Text> */}
          {/* <Text numberOfLines={2} style={styles.cardDetails}>{itemData.deliveryCharge}</Text> */}
          <Text style={styles.cardTitle}>User Name : {itemData.Name}</Text>
          <Text style={styles.cardTitle}>Email ID : {itemData.email}</Text>
          <Text style={styles.cardTitle}>Mobile No. : {itemData.phone}</Text>
          <Text style={styles.cardTitle}>Wallet Coins : {itemData.walletCoins}</Text>
          <Text style={styles.cardTitle}>Role : {itemData.role}</Text>
          <Text style={styles.cardTitle}>Total Orders : {filterData.length}</Text>

        
         

          
        </View>
        
        
      </View>
    </TouchableOpacity>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({

  container:{
    flex:1
  },
  card: {
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    backgroundColor:'#fff',
    elevation:4,
    marginTop:10,
    borderRadius:10,
    height:130,
    marginBottom:10
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
   width:90,
   height:90,
   borderRadius:10,
   margin:responsiveWidth(2)
   
  },
  cardInfo: {
    flex:2,
    padding: 10,
    backgroundColor: '#fff',
    
  },
  cardTitle: {
    fontWeight: 'bold',
    
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  icon:{
    width:24,
    height:24,
    margin:10

  },
  finalTotal:{

    margin:responsiveWidth(1.1),
    fontSize:responsiveFontSize(2),
    color:'green'


  }
});