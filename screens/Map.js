import { View, Text } from 'react-native'
import {React,useState}from 'react'
import MapView, { Marker } from 'react-native-maps';

export default function map() {

    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        if (selectedLocation) {
          // Use built-in reverse geocoding capabilities
          // Note: This example is for Android; iOS has a similar capability
          const { latitude, longitude } = selectedLocation;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
              const address = data.display_name;
              setSelectedAddress(address);
            })
            .catch((error) => {
              console.error('Error fetching address:', error);
            });
        }
      }, [selectedLocation]);

      const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
        // console.log(selectedLocation)
      };


  return (
    <View>
       <View style={{}}>
        <Text>Select your location on the map:</Text>
        <MapView
          style={{ width: '100%',height: screenHeight * 0.2}}
          onPress={handleMapPress}
        >
          {selectedLocation && (
            <Marker coordinate={selectedLocation} />
          )}
        </MapView>
        {selectedAddress && (
          <Text>Selected Address: {selectedAddress}</Text>
        )}
      </View> 
    </View>
  )
}