import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View,PermissionsAndroid ,Image, Platform, ScrollView, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'


import * as FileSystem from 'expo-file-system';

import { db } from '../config'
import {ref,set} from 'firebase/database'
import { useNavigation, useRoute } from '@react-navigation/native';

import firebase from 'firebase/compat';

// Define a function to update data
const editGrocery = async(itemKey, newData) => {
  const payload = {
    itemKey,
    newData
  }
  try {
    const data = await fetch(`http://192.168.1.10:8082/myapp/editGrocery`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(payload)
    });
    const items = await data.json();
    // console.log(items);
    // console.log(await data.json());
    
  } catch (error) {
    Alert.alert("Not updated");
  }
    // const db = firebase.database();
    // const ref = db.ref(`Grocery/${itemKey}`); 
  
    // // Update the data
    // ref
    //   .update(newData)
    //   .then(() => {
    //     console.log('Data updated successfully.');
    //   })
    //   .catch((error) => {
    //     console.error('Error updating data:', error);
    //   });
  };
  


export function EditGrocery () {

    const route=useRoute()
    const navigation=useNavigation()
  

    const [imageData,setImageData]= useState(route.params.data.imageData)

    const [name,setName]=useState(route.params.data.name)
    const [price,setPrice]=useState(route.params.data.price)
    const [discount,setDiscount]=useState(route.params.data.discount)
    const [description,setDescription]=useState(route.params.data.description)


    const getImageSize = async (uri) => {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const sizeInBytes = fileInfo.size;
      return sizeInBytes;
    };



    


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
        // setImageData(result.assets[0].uri)
        // console.log(imageData)

        const imageUri = result.assets[0].uri;
        const imageSize = await getImageSize(imageUri);
    
        if (imageSize <= 200 * 1024) { // 50 KB in bytes
          // Image is smaller than 50 KB, you can use it
          // Your logic to use the image here

          setImageData(result.assets[0].uri)
          console.log(imageData)
          
        } else {
          // Image is too large, display an error message
          console.log('Image size exceeds 50 KB');
        }
      }

      
    }

    const handleEdit=()=>{
console.log(route.params.id);
        const newData={
            name:name,
            price:price,
            discount:discount,
            description:description,
            imageData:imageData


        }
        editGrocery(route.params.id,newData)
        navigation.push('Admin')
    }

    
    return (
      <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Edit Grocery</Text>
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
        <TouchableOpacity style={styles.uploadBtn} onPress={handleEdit}>
            <Text>Edit Grocery</Text>
        </TouchableOpacity>



       
        
      </View>
      </ScrollView>
    )
  
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop:15
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