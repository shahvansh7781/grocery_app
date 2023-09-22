import React, { Component, useEffect, useState } from 'react'
import { Text, View ,StyleSheet,FlatList} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { CartCard } from './Cards/CartCard'

import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'


export function Cart () {


    const data=useSelector((state)=>state.Cart)
    

    const navigation=useNavigation()

    const [subTotal,setSubTotal]=useState(0)

     // Calculate subtotal when data changes
        useEffect(() => {
            let total = 0;
            data.forEach((item) => {
            total += item.price*item.count;
            });
            setSubTotal(total);

            // console.log('useEffect')
            // console.log(data[0].count)
        }, [data]);
            
    const renderItem=({item})=>{

       
        return(
        
          <CartCard
         
          itemData={item}
          ></CartCard>
          
        )
       
      }
    

     
    
    return (
      
        <View style={styles.container}>

                 <View style={styles.header}>
                        <Text style={styles.headerText}>My Cart</Text>
                 </View>

                 <View style={styles.flatListContainer}>
                        <FlatList
                                style={styles.scrollableSection}
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={item=>item.id}>
                        </FlatList> 
                 </View>

                <TouchableOpacity>
                    <View >
                        <Text style={styles.addmore} onPress={()=>{navigation.push('Home')}}> + Add More Items</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.card}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                            <Text style={styles.totalText}>Sub Total : </Text>
                            <Text style={styles.totalPrice}>{subTotal}</Text>
                    </View>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                            <Text style={styles.totalText}>Delievery Charge : </Text>
                            <Text style={styles.totalPrice}>{10}</Text>
                    </View>

                     {/* Horizontal line */}
                    <View style={styles.line}></View>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                            <Text style={styles.totalText}>Grand Total : </Text>
                            <Text style={styles.totalPrice}>{subTotal + 10}</Text>
                    </View>

                    
                    

                    

                   

                </View>
                <View>
                    <TouchableOpacity style={styles.uploadBtn} onPress={()=>{}}>
                        <Text>Check Out</Text>
                    </TouchableOpacity>
                </View>


        </View>

           
       
     
    )
  
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        height:60,
        width:'100%',
        backgroundColor:'#fff',
        elevation:5,
        paddingLeft:20,
        justifyContent:'center',
        marginTop:'7%'
    
    },
    headerText:{
        fontSize:20,
        fontWeight:'800'
    },
    flatListContainer: {
        flex: 0.6, // Set the height of FlatList to 50% of the parent container
    },
    addmore:{
        color:'green',
        fontSize:28,
        marginLeft:'5%',
        marginTop:'10%',
        marginBottom:'3%',
        backgroundColor:'white',
        width:'65%',
        borderRadius:10
    },
    card: {
        flex:0.3,
        width:'90%',
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        elevation:4,
        marginTop:10,
        borderRadius:10,
        
        marginBottom:10
      },

      totalText:{
        fontSize:18,
        margin:'1%',
        marginLeft:25
       

      },
      totalPrice:{
        fontSize:16,
        margin:'1%',
        marginRight:25,
        color:'gray',


      },
      line: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginVertical: 10,
      },
      uploadBtn:{
        width:'90%',
        height:50,
        borderRadius:10,
        borderWidth:0.5,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
       
        backgroundColor:'#06FF00',
  
       
        
  
    },
   
    
})