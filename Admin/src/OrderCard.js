import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';





const OrderCard = ({itemData}) => {

  const navigation=useNavigation()
  const dispatch=useDispatch()

  // console.log('From card',itemData)




 
 
 
  return (
   
    <View  style={styles.container}>
       
    <TouchableOpacity  
    onPress={()=>{navigation.navigate('AdminOrderDetail',{
      data:itemData,
      id:itemData.id
    })}}  >
      <View style={styles.card} >
        
        <View style={styles.cardInfo}>
          {/* <Text style={styles.cardTitle}>{itemData.title.length > 5 ? itemData.title.slice(0,10) + '...' : itemData.title}</Text> */}
          {/* <Text numberOfLines={2} style={styles.cardDetails}>{itemData.deliveryCharge}</Text> */}
          <Text style={styles.cardTitle}>User Name : {itemData.userName}</Text>
          <Text style={styles.cardTitle}>Email ID : {itemData.userEmail}</Text>
          <Text style={styles.cardTitle}>Total No. Of Items : {itemData.items.length}</Text>
          <Text style={styles.cardTitle}>Delivery Charge : {itemData.deliveryCharge}</Text>
          <Text style={styles.cardTitle}>Status : {itemData.status}</Text>

        
         

          
        </View>
        
        <View>
          
          <TouchableOpacity>
              <Text style={styles.finalTotal}>₹{itemData.grandTotal}</Text>
              
          </TouchableOpacity>
           
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
};

export default OrderCard;

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
    padding: 15,
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