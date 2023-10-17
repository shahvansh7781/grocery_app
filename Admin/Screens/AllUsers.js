import { View, Text,ActivityIndicator ,StyleSheet,FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../Reducers/UserReducer'
import { useState,useEffect } from 'react'
import UserCard from '../src/UserCard'
import { fetchOrders } from '../../Reducers/OrderReducer'
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import axios from 'axios'
import { api_url } from '../../utils/api_url'

export default function AllUsers() {


   

    const dispatch=useDispatch()
    const users=useSelector((state)=>state.users.data)
    // console.log(users)
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
      dispatch(fetchUsers())
      .then(() => setIsLoading(false)) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false
      });
    }, [dispatch]);


   const handleReport = async()=>{
    const payload = users;
    try {
      const response = await axios.post(`${api_url}:8082/myapp/userReport`,JSON.stringify(payload),{
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
              <>
              <UserCard
              itemData={item}
              ></UserCard>
              </>
            
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
                  data={users}
                  renderItem={renderItem}
                  keyExtractor={item=>item.id}>
            </FlatList> 
            <View style={{backgroundColor:"white"}}>

            <TouchableOpacity style={styles.uploadBtn} onPress={handleReport}>
                <Text style={{color:"white",fontFamily:"Poppins-SemiBold",fontSize:responsiveFontSize(2)}}>
                   Generate Report
                </Text>
            </TouchableOpacity>
            </View>
        </>
       
   )}
    
    </> 
  )
}


const styles= StyleSheet.create({
   
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