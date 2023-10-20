import { View, Text,StyleSheet,SafeAreaView ,FlatList,ActivityIndicator, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize,responsiveHeight } from "react-native-responsive-dimensions";
import OrderCard from '../src/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchOrders } from '../../Reducers/OrderReducer';
import axios from 'axios';
import { api_url } from '../../utils/api_url';
export default function AllOrders() {

  const dispatch=useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const data=useSelector((state)=>state.orders.data)
  // console.log("AllOrders",data)
  
  useEffect(() => {
    dispatch(fetchOrders())
    .then(() => setIsLoading(false)) // Data fetched, set isLoading to false
    .catch((error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false); // In case of an error, also set isLoading to false
    });
  }, [dispatch]);

  const handleReport = async()=>{
    const payload = data;
    try {
      const response = await axios.post(`${api_url}:8082/myapp/orderReport`,JSON.stringify(payload),{
        headers:{
          'Content-Type':"application/json"
        }
      })
      if (response.data.success) {
        alert("Report Generated Successfully")
      }
    } catch (error) {
      alert(error)
    }
   }
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
       

        
        
        <>
        
       
          <FlatList
                  style={styles.scrollableSection}
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item=>item.id}>
            </FlatList> 
            <TouchableOpacity style={styles.uploadBtn} onPress={handleReport}>
                <Text style={{color:"white",fontFamily:"Poppins-SemiBold",fontSize:responsiveFontSize(2)}}>
                   Generate Report
                </Text>
            </TouchableOpacity>
                    </>
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
      uploadBtn: {
        width: "90%",
        display:"flex",
        // height: responsiveHeight(8),
        paddingVertical:12,
        borderRadius: 10,
        // borderWidth: 0.5,
        elevation:2,
        alignSelf: "center",
        justifyContent: "center",
        alignContent:"center",
        alignItems: "center",
        marginVertical: "4%",
        backgroundColor: "#2DDC4A",
      },
  })