import React, { Component, useState } from 'react'
import { Text, View ,StyleSheet, Image} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Groceries } from './Groceries'
import { AddGrocery } from './AddGrocery'
import { Transactions } from './Transactions'
import Stats from './Stats'

export default function DashBoard () {

  const [selectedTab,SetSelectedTab]= useState(0)
  
    return (
      <View style={styles.container}>
        {selectedTab==0?(<Groceries></Groceries>):selectedTab==1?(<AddGrocery/>):(<Transactions></Transactions>)}
        <View style={styles.bottom}>
          <TouchableOpacity style={[styles.bottomTab,{ backgroundColor: selectedTab==0? '#CBFFA9':'#fff'}]} onPress={()=>{SetSelectedTab(0)}}>
                <Image source={require('../Images/shopping-bag.png')}  style={[styles.bottomImg]}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTab} onPress={()=>{SetSelectedTab(1)}}>
                <Image source={require('../Images/plus.png')}  style={[styles.bottomImg,{marginBottom:30,width:50,height:50}]}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomTab,{ backgroundColor: selectedTab==2? '#CBFFA9':'#fff'}]} onPress={()=>{SetSelectedTab(2)}}>
                <Image source={require('../Images/transaction-history.png')}  style={styles.bottomImg}></Image>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop:25
    },
    bottom:{
        width:'100%',
        height: 60,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        backgroundColor:'#fff'

    },
    bottomTab:{
      height:'100%',
      width:"20%",
      justifyContent:'center',
      alignItems:'center'
    },
    bottomImg:{
      width:30,
      height:30

    }
  })