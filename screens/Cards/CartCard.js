import React, { Component ,useState} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { deletee, updateCount } from '../../Reducers/CartReducers';

import { useDispatch } from 'react-redux'


export function CartCard ({itemData}){

    const [count,setCount]=useState(itemData.count)
    const dispatch=useDispatch()

    // const handleUpdate=(event)=>{
    //     event.preventDefault()
    //     dispatch(update({id:id,title:utitle,desc:udesc}))
    //     navigate('/')
    // }
    

    const incCount=(event)=>{

       
        // console.log('increment')

        if(count<itemData.stock)
        {
            const newCount=count+1
            setCount(newCount)
            dispatch(updateCount({id:itemData.id,count:newCount}))

        }
       
        // event.preventDefault()
        // console.log('count',count)
       

       
    }
    const decCount=(event)=>{

        
        if (count>1){
            const newCount=count-1
            setCount(newCount)
            dispatch(updateCount({id:itemData.id,count:newCount}))
        }
        // event.preventDefault()
        
        
    }


    const deleteFromCart=(id)=>{

        dispatch(deletee({id:id}))


    }
    return (
      <View>
        <TouchableOpacity    >
                <View style={styles.card} >
                    <View >
                    <Image
                        source={itemData.image}
                        resizeMode="cover"
                        style={styles.cardImg}
                    
                    />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>{itemData.title}</Text>
                        <Text style={styles.cardPrice}>Rs. {itemData.price}</Text>

                        <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={()=>{incCount()}}>
                                    <Image source={require('../Cards/plus_cart.jpeg')} style={styles.icon} ></Image>
                                    
                                </TouchableOpacity>
                                <Text style={styles.cardInfo}>{count}</Text>
                                <TouchableOpacity onPress={()=>{decCount()}}>
                                    <Image source={require('../Cards/minus_cart.jpeg')} style={styles.icon} ></Image>
                                    
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>{deleteFromCart(itemData.id)}}>
                                    <Image source={require('../Cards/delete.png')} style={[styles.icon,{bottom:'2%',left:'90%'}]} ></Image>
              
                                </TouchableOpacity>
                        </View>

                      

                        
                    </View>
                    
                </View>
            </TouchableOpacity>


           
      </View>
    )
  
}


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
    height:100,
    marginBottom:10
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
   width:90,
   height:90,
   borderRadius:10,
   margin:5
  },
  cardInfo: {
   
    margin:12,
    
    
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize:18
    
  },
  cardPrice: {
    fontWeight: '200',
    fontSize:14,
    color:'gray'
    
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  icon:{
    width:35,
    height:35,
    margin:8,
    

  },
 
});