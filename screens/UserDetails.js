import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { api_url } from '../utils/api_url'
import { auth } from '../Admin/config'
import { useSelector } from 'react-redux'

const UserDetails = () => {
const user = useSelector((state)=>state.users.user);
// console.log("User details screen: ",user ? user:"loading");   
  return (
    <>
    {user ? <View>
      <Text>UserDetails {user.userData.Name} - {user.userData.role}</Text>
      <Button title='SignOut' onPress={()=>{auth.signOut()}}/>
    </View> : <ActivityIndicator size="large" color="black" /> }
    
    </>
  )
}

export default UserDetails