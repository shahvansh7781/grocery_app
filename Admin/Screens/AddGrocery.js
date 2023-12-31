import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View,PermissionsAndroid ,Image, Platform, ScrollView, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'


export function AddGrocery () {

  

    const [imageData,setImageData]= useState(null)

    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [discount,setDiscount]=useState('')
    const [description,setDescription]=useState('')


 //to take Permission to access gallery
    const premit =async ()=>{
      if(Platform.OS !== 'web')
      {
        const {status}= await ImagePicker.requestMediaLibraryPermissionsAsync()
        console.log(status)

      if(status!== 'granted')
      {
        alert('Permission Denied !')

      }
      else{
        pickImage()
      }
      }



    }

//to pick image from gallery
    const pickImage= async()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        // allowsEditing:true,
        // aspect:[4,3],
        // quality:1
       
      })
      console.log(result)
      if(!result.canceled)
      {
        setImageData(result.assets[0].uri)
      }
    }

    
    return (
      <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Add Grocery</Text>
        </View>

        {imageData !== null?(
            <Image
            source={{uri :imageData}}
            style={styles.img}
            ></Image>
        ):null}

        <TextInput placeholder="Enter Grocery Name" style={styles.input}
        value={name}
        onChangeText={text => setName(text)}></TextInput>
        <TextInput placeholder="Enter Grocery Price" style={styles.input}
        value={price}
        onChangeText={text => setPrice(text)}></TextInput>
        <TextInput placeholder="Enter Discount" style={styles.input}
        value={discount}
        onChangeText={text => setDiscount(text)}></TextInput>
        <TextInput placeholder="Enter Grocery Description" style={styles.input}
        value={description}
        onChangeText={text => setDescription(text)}></TextInput>

        <TouchableOpacity style={styles.pickImg} onPress={()=>{premit()}}>
            <Text>Pick Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadBtn} >
            <Text>Upload Grocery</Text>
        </TouchableOpacity>



       
        
      </View>
      </ScrollView>
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
        justifyContent:'center'
    
    },
    headerText:{
        fontSize:20,
        fontWeight:'800'
    },
    input:{
        width:'90%',
        height:50,
        borderRadius:10,
        borderWidth:0.5,
        paddingLeft:20,
        paddingRight:20,
        marginTop:30,
        alignSelf:'center'
    },
    pickImg:{
        width:'90%',
        height:50,
        borderRadius:10,
        borderWidth:0.5,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        backgroundColor:'#06FF00',
        

    },
    uploadBtn:{
      width:'90%',
      height:50,
      borderRadius:10,
      borderWidth:0.5,
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
      marginTop:20,
      backgroundColor:'#06FF00',

      marginBottom:75
      

  },
    img:{
        width:'90%',
        height:200,
        borderRadius:10,
        alignSelf:'center',
        marginTop:20
    }

})