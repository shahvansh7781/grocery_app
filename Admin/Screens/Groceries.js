import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import firebase from "firebase/compat";
import Card from "../src/Card";
import { ImageBackground } from "react-native";

export function Groceries() {
  const [data, setData] = useState();

  const fetchGroceries = async() => {
    
    try {
      const data = await fetch(`http://192.168.1.10:8082/myapp/getGrocery`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const items = await data.json();
      // console.log(await data.json());
      setData(items.grocery);
      console.log(items.grocery);
    } catch (error) {
      Alert.alert("Data not fetched");
    }
    // const database = firebase.database();
    // const dataRef = database.ref('Grocery');

    // // Listen for changes in the 'data' node
    // dataRef.on('value', (snapshot) => {
    //   const items = [];
    //   snapshot.forEach((childSnapshot) => {
    //     const key=childSnapshot.key
    //     const item = childSnapshot.val();
    //     items.push({ key, ...item });
    //   });
    //   console.log(items)
    //   setData(items);

    // });

    // Clean up the listener when the component unmounts
    // return () => dataRef.off('value');
  };
  useEffect(()=>{
    fetchGroceries();
  }, []);

  const renderItem = ({ item }) => {
    return <Card itemData={item}></Card>;
  };

  return (
    <View>
      <FlatList
        style={styles.scrollableSection}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>

      {/* {data.map((item, index) => (
        <View key={index}>
          <Text>Name: {item.name}</Text>
          <Text>Description: {item.description}</Text>
          <Image
          style={styles.img}
          source={{uri:item.imageData}}
          >
          </Image>
        </View>
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollableSection: {
    height: "100%", // Take the other half of the available width
    backgroundColor: "white",
    padding: 15,
  },
  img: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
});
