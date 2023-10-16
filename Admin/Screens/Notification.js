import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Reducers/UserReducer';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function sendPushNotification(expoPushToken, title, body) {
  console.log('pushhy');
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: {
      deepLink: 'exp://grocery-app-react-native/Home',
    },
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const responseData = await response.json(); // Parse the response JSON
    console.log(responseData); // Log the parsed response data
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
}

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [tokenObtained, setTokenObtained] = useState(false);
  const usersToken=[];
  const dispatch=useDispatch()
  const users=useSelector((state)=>state.users.data)
  console.log(users);
  users && users.forEach((user)=>{
    usersToken.push(user.token);
})
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    dispatch(fetchUsers())
    .then(() => {
      
      console.log("Notification.js - ",users)
      setIsLoading(false)
    }
    
    ) // Data fetched, set isLoading to false
    .catch((error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false); // In case of an error, also set isLoading to false
    });
  }, [dispatch]);

  useEffect(() => {
    // Request permission for notifications
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to send notifications was denied');
        return;
      }

      // Get the device's Expo push token
      const token = (await Notifications.getExpoPushTokenAsync({ projectId: 'dad94796-4b29-4812-9adf-fca37769e4c0' })).data;
      setExpoPushToken(token);

      setTokenObtained(true); // Set the state to indicate that the token is obtained
    })();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      // Handle the received notification
      console.log(notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (tokenObtained) {
      // Check if the token is obtained before sending the notification
      console.log(expoPushToken)
      console.log('Hello');
      // sendPushNotification(expoPushToken, 'Hello', 'This is a test notification');
    }
  }, [tokenObtained, expoPushToken]);
console.log("Before return - Noti",usersToken)
  return (
    <View>
      <Text>Expo Push Token: {expoPushToken}</Text>
      <Button
        onPress={() => {
          console.log('Press');
          console.log("On Press Notif",usersToken)
          sendPushNotification(['ExponentPushToken[ZHAcv_DHc_4j--G1KP2fX2]','ExponentPushToken[G0HFmRFq9p8fHLzhIFTcgJ]','ExponentPushToken[_EspNQNyHvX8EiwaNz_Tzn]'], 'Hello', 'This is a test notification');
        }}
      >
        Rushit
      </Button>
    </View>
  );
}