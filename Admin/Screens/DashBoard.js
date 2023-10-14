import React, { Component, useState } from 'react'
import { Text, View ,StyleSheet, Image,FlatList} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Groceries } from './Groceries'
import { AddGrocery } from './AddGrocery'
import { Transactions } from './Transactions'
import Stats from './Stats'
import AllOrders from './AllOrders'

import { responsiveFontSize,responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions'

import Icon from 'react-native-vector-icons/FontAwesome5';
import Charts from './Charts'
import AllUsers from './AllUsers'

export default function DashBoard () {

  const [selectedTab,SetSelectedTab]= useState(1)

  const iconList = [
    { id: 1, name:'shopping-basket' },
    {id:2, name:'plus-circle'},
    {
      id:3 , name:'list-alt'
    },
    {id:4, name:'chart-bar'},
    {id:5, name:'user'},
    {id:6, name:'bell'}

   
  ];

  const renderIcon = ({ item }) => {
    if (item.id === selectedTab) {
      return (
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.activebuttonText}
            onPress={() => SetSelectedTab(item.id)}
          >
             <Icon name={item.name} size={30} /> 
           
          </Text>

         

        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => SetSelectedTab(item.id)}
          >
            <Icon name={item.name} size={30} /> 
          </Text>
        </TouchableOpacity>
      );
    }
  };
  
    return (
      <View style={styles.container}>
       
        {/* <View style={styles.bottom}>
          <TouchableOpacity style={[styles.bottomTab,{ backgroundColor: selectedTab==0? '#CBFFA9':'#fff'}]} onPress={()=>{SetSelectedTab(0)}}>
                <Image source={require('../Images/shopping-bag.png')}  style={[styles.bottomImg]}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTab} onPress={()=>{SetSelectedTab(1)}}>
                <Image source={require('../Images/plus.png')}  style={[styles.bottomImg,{marginBottom:30,width:50,height:50}]}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomTab,{ backgroundColor: selectedTab==2? '#CBFFA9':'#fff'}]} onPress={()=>{SetSelectedTab(2)}}>
                <Image source={require('../Images/transaction-history.png')}  style={styles.bottomImg}></Image>
          </TouchableOpacity>
        </View> */}


      

          <View>
            <FlatList
              data={iconList}
              renderItem={renderIcon}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
              contentContainerStyle={styles.buttonList} // Adjust container style
            />
          </View>

        {selectedTab==1?(<Groceries></Groceries>):selectedTab==2?(<AddGrocery/>):selectedTab==3?(<AllOrders></AllOrders>):selectedTab==4?(<Charts></Charts>): selectedTab==5?(<AllUsers></AllUsers>):(<Text>none</Text>)}

      </View>
    )
  }

  const styles=StyleSheet.create({
    container:{
        flex:1,
        // marginTop:25
    },
    bottom:{
        width:'100%',
        height: 60,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        // position:'absolute',
        // bottom:0,
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

    },

    button: {
      backgroundColor: "white",
      padding: responsiveWidth(2.5),
      borderRadius: 5,
      marginRight: responsiveWidth(2),
      // width: responsiveWidth(45),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width:responsiveWidth(18)
    },
    
    buttonText: {
      fontSize: responsiveFontSize(1.8),
      fontWeight: "bold",
    },
    activebuttonText: {
      fontSize: responsiveFontSize(1.8),
      fontWeight: "bold",
      color: "green",
    },
    buttonList: {
     
      padding: 10,
     
    },
  })