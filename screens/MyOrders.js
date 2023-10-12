import { View, Text ,StyleSheet,ActivityIndicator,FlatList} from 'react-native'
import React, { useState ,useEffect} from 'react'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../Reducers/OrderReducer'
import MyOrderCard from './Cards/MyOrderCard'

export default function MyOrders() {

    const route=useRoute()
    const email=route.params.email

    const dispatch=useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const [filterData,setFilterData]=useState([])
    const data=useSelector((state)=>state.orders.data)
    
    useEffect(() => {
      dispatch(fetchOrders())
      .then(() =>{dataFilter(); setIsLoading(false)}) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false
      });
    }, [dispatch]);


    const dataFilter=()=>{
         const filteredOrders = data.filter(order => order.userEmail === email);
         setFilterData(filteredOrders)
    }

    const renderItem=({item})=>{
        console.log(item)
            return(
              <MyOrderCard
              itemData={item}
              ></MyOrderCard>
            
            )
           
          }
  return (
    <>
    {isLoading ? (
        <ActivityIndicator size="large" color="#06FF00" />
      ) : (
       

        
        
        
       
          <FlatList
                  style={styles.scrollableSection}
                  data={filterData}
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
        padding: 15,
      },

  })