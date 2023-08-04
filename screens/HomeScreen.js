import { useNavigation } from '@react-navigation/native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { removeItem } from '../utils/asyncStorage'

export default function HomeScreen () {
  const navigation=useNavigation()

  const handleReset=async()=>{
    await removeItem('onboarded')

    navigation.push('OnBoarding')

  }
  const handleAdmin=async()=>{
   

    navigation.push('Admin')

  }
    return (
      <SafeAreaView style={{padding:100,alignItems:'center'}}>
            <Text style={{fontSize:30,padding:20}}>Home</Text>
            <TouchableOpacity style={{backgroundColor:'#06FF00',width:200,height:50,alignItems:'center',}} onPress={handleReset}>
              <Text style={{fontSize:30}}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#06FF00',width:200,height:50,alignItems:'center',marginTop:20}} onPress={handleAdmin}>
              <Text style={{fontSize:30}}>Admin</Text>
            </TouchableOpacity>
      </SafeAreaView>
    )
  
}
