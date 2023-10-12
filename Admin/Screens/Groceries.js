import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Image ,ActivityIndicator} from "react-native";
import firebase from "firebase/compat";
import Card from "../src/Card";
import { ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroceries } from "../../Reducers/GroceryReducer";
import Card2 from "../src/Card2";

export function Groceries() {
  // const [data, setData] = useState();

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const data = useSelector((state) => state.groceries.data);
    // console.log("Rushit")
    // console.log(data)
    
  
    useEffect(() => {
      dispatch(fetchGroceries())
      .then(() => setIsLoading(false)) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false
      });
    }, [dispatch]);

  // const fetchGroceries = async() => {
    
  //   try {
  //     const data = await fetch(`http://192.168.1.3:8082/myapp/getGrocery`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const items = await data.json();
  //     // console.log(await data.json());
  //     setData(items.grocery);
  //     console.log(items.grocery);
  //   } catch (error) {
  //     Alert.alert("Data not fetched");
  //   }
  //   // const database = firebase.database();
  //   // const dataRef = database.ref('Grocery');

  //   // // Listen for changes in the 'data' node
  //   // dataRef.on('value', (snapshot) => {
  //   //   const items = [];
  //   //   snapshot.forEach((childSnapshot) => {
  //   //     const key=childSnapshot.key
  //   //     const item = childSnapshot.val();
  //   //     items.push({ key, ...item });
  //   //   });
  //   //   console.log(items)
  //   //   setData(items);

  //   // });

  //   // Clean up the listener when the component unmounts
  //   // return () => dataRef.off('value');
  // };
  // useEffect(()=>{
  //   fetchGroceries();
  // }, []);

  const renderItem = ({ item }) => {
    return <Card2 itemData={item}></Card2>;
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="#06FF00" />
      ) : (
        <>
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
        </>
      )}
    </>
  );
  
   
}

const styles = StyleSheet.create({
  scrollableSection: {
    // height: "100%", // Take the other half of the available width
    // backgroundColor: "white",
    paddingHorizontal: 7,
  },
  img: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
});
