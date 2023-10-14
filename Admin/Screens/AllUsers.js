import { View, Text,ActivityIndicator ,StyleSheet,FlatList} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../Reducers/UserReducer'
import { useState,useEffect } from 'react'
import UserCard from '../src/UserCard'
import { fetchOrders } from '../../Reducers/OrderReducer'


export default function AllUsers() {


   

    const dispatch=useDispatch()
    const users=useSelector((state)=>state.users.data)
    console.log(users)
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
      dispatch(fetchUsers())
      .then(() => setIsLoading(false)) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false
      });
    }, [dispatch]);


   

    const renderItem=({item})=>{
        console.log(item)
            return(
              <UserCard
              itemData={item}
              ></UserCard>
            
            )
           
          }
  
  return (
    <>
    {isLoading ? (
        <ActivityIndicator size="large" color="#06FF00" />
      ) : (
       

        
        
        
       
          <FlatList
                  style={styles.scrollableSection}
                  data={users}
                  renderItem={renderItem}
                  keyExtractor={item=>item.id}>
            </FlatList> 
      
   )}
    
    </> 
  )
}


const styles= StyleSheet.create({
   
    scrollableSection: {
        height: "100%", // Take the other half of the available width
        backgroundColor: "white",
       
      },

  })