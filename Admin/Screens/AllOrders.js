import { View, Text,StyleSheet,SafeAreaView ,FlatList,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize,responsiveHeight } from "react-native-responsive-dimensions";
import OrderCard from '../src/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchOrders } from '../../Reducers/OrderReducer';

export default function AllOrders() {

  const dispatch=useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const data=useSelector((state)=>state.orders.data)
  console.log("AllOrders",data)
  
  useEffect(() => {
    dispatch(fetchOrders())
    .then(() => setIsLoading(false)) // Data fetched, set isLoading to false
    .catch((error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false); // In case of an error, also set isLoading to false
    });
  }, [dispatch]);

  const renderItem=({item})=>{
    console.log(item)
        return(
          <OrderCard
          itemData={item}
          ></OrderCard>
        
        )
       
      }
  return (

    <>
    {isLoading ? (
        <ActivityIndicator size="large" color="#06FF00" />
      ) : (
       

        
        
        
       
          <FlatList
                  style={styles.scrollableSection}
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item=>item.id}>
            </FlatList> 
      
   )}
    
    </> 
  
  )
}


const styles= StyleSheet.create({
    // container:{
    //   flex:1,
      
    // //   flexDirection: 'column', 
    //   backgroundColor:'white'
     
    // },
    
   
    // scrollableSection: {
    //   // height:'20%', // Take the other half of the available width
    //   flex:0.9,
    //   backgroundColor: 'white',
    
    // },
    scrollableSection: {
        height: "100%", // Take the other half of the available width
        backgroundColor: "white",
       
      },

  })