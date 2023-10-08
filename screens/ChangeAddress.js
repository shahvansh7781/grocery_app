import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress, updateCoor } from '../Reducers/AddressReducer';
import { responsiveWidth,responsiveHeight } from 'react-native-responsive-dimensions';

export default function ChangeAddress() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  const dispatch=useDispatch()


  const addressData=useSelector((state) => state.Address)

  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;

    // console.log("R,coordinate)
    
    setSelectedLocation(coordinate);
   
    // Convert coordinates to address using Nominatim API
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinate.latitude}&lon=${coordinate.longitude}`
      );
      const address = response.data.display_name;
      setSelectedAddress(address);
      const addr=response.data.display_name
      dispatch(updateAddress({address:{addr}}))
      dispatch(updateCoor({coords:coordinate}));
      
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  const navigation = useNavigation();

  const handleDonePress = () => {
    // Perform any necessary actions before navigating back
  
    // Navigate back to the previous screen
    navigation.goBack();
  };
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.card}>
        <MapView
          style={{ flex: 1 }}
          onPress={handleMapPress}
          initialRegion={{
            latitude: 20.5937, // Latitude of India's center
            longitude: 78.9629, // Longitude of India's center
            latitudeDelta: 12, // Adjust the delta values as needed
            longitudeDelta: 12, // to control the zoom level
          }}
        >
          {selectedLocation && (
            <Marker coordinate={selectedLocation} />
          )}
        </MapView>
      </View>
      {/* {selectedAddress !== '' && (
        <View style={{ flex: 0.5, padding: 16 }}>
          <Text>Selected Address:</Text>
          <Text>{selectedAddress}</Text>
        </View>
      )} */}


    {/* <View style={styles.cardAddress}>
        <Text>Order Will Be Deliver To : {addressData.address.addr}</Text>
    </View> */}

    <View style={styles.cardAddress}>

                  <Text style={{color:'#2DDC4A',marginBottom:responsiveHeight(1)}}>Order Will Be Deliver To : </Text>
                  <Text>{addressData.address.addr}</Text>
                  
    </View>
  
      {/* <Button
        title="Done"
        onPress={handleDonePress}
      /> */}
    
     <View>
        <TouchableOpacity style={styles.uploadBtn} onPress={handleDonePress}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

}


const styles=StyleSheet.create({
    card: {
        flex: 0.8,
        width: "95%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        elevation: 4,
        marginTop: 10,
        borderRadius: 10,
    
        marginBottom: 10,
      },
      uploadBtn: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom:"4%",
        backgroundColor: "#06FF00",
        marginTop:responsiveHeight(2)
      },
      cardAddress: {
        flex: 0.15,
      
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        elevation: 4,
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,
        padding:responsiveWidth(2)
      },
})