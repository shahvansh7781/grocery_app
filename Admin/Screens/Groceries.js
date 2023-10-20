import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Image ,ActivityIndicator,TouchableOpacity} from "react-native";
import firebase from "firebase/compat";
import Card from "../src/Card";
import { ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroceries } from "../../Reducers/GroceryReducer";
import Card2 from "../src/Card2";


import axios from "axios";
import { api_url } from "../../utils/api_url";

import { responsiveFontSize,responsiveHeight,responsiveWidth } from "react-native-responsive-dimensions";

import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing';

import { FontAwesome5 } from 'react-native-vector-icons';



export function Groceries() {
  // const [data, setData] = useState();

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const data = useSelector((state) => state.groceries.data);
   
    // console.log(data)
    
  
    useEffect(() => {
      dispatch(fetchGroceries())
      .then(() => setIsLoading(false)) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false
      });
    }, [dispatch]);

    const handleReport = async()=>{
      const payload = data;
      try {
        const response = await axios.post(`${api_url}:8082/myapp/groceryReport`,JSON.stringify(payload),{
          headers:{
            'Content-Type':"application/json"
          }
        })
        if (response.data.success) {
          alert("Report Generated Successfully")
        }
      } catch (error) {
        alert(error)
      }
     }
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


  async function convertJSONToCSV() {
    const csv = Papa.unparse(data);
    console.log('dir',FileSystem.documentDirectory)
    const path = FileSystem.documentDirectory + 'data.csv';
   
  
    await FileSystem.writeAsStringAsync(path, csv, { encoding: FileSystem.EncodingType.UTF8 });
    console.log('path',path)
    openAndReadFile(path)
    return path;
  }
  async function openAndReadFile(filePath) {
  
   
    try {
  
      // filePath='file:///data/user/0/host.exp.exponent/files/data.csv'
      // Read the contents of the file
      const fileInfo = await FileSystem.getInfoAsync(filePath);
  
      if (fileInfo.exists) {
        // File exists, proceed to read its contents
        const content = await FileSystem.readAsStringAsync(filePath);
        console.log('File content:', content);
        saveFileToStorage(content,'groceries.csv')
        // downloadFile(content,'data.csv','text/csv')
  
      } else {
        console.log('File does not exist.');
      }
    } catch (error) {
      console.error('Error reading the file:', error);
    }
  }
  
  async function saveFileToStorage(content, fileName) {
    try {
      const fileUri = FileSystem.documentDirectory + fileName;
  
      // Write the file to the document directory
      await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
  
      console.log(`File saved at ${fileUri}`);
      
      shareFile(fileUri,'x.csv')
    } catch (error) {
      console.error('Error saving the file:', error);
    }
  }
  
  
  
  async function shareFile(fileUri, fileName) {
    try {
      const result = await Sharing.shareAsync(fileUri, {
        mimeType: 'application/octet-stream',
        dialogTitle: `Download ${fileName}`,
        UTI: 'public.data',
      });
  
      if (result.action === Sharing.SharedAction.PREVIEW) {
        console.log('File previewed');
      } else if (result.action === Sharing.SharedAction.OPEN) {
        console.log('File opened');
      } else if (result.action === Sharing.SharedAction.SHARE) {
        console.log('File shared');
      } else if (result.action === Sharing.SharedAction.CANCEL) {
        console.log('Sharing canceled');
      }
    } catch (error) {
      console.error('Error sharing the file:', error);
    }
  }
  
  
  
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="#06FF00" />
      ) : (
        <>
          <View style={{flex:1,backgroundColor:"white"}}>
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
                  <View style={{backgroundColor:"white"}}>


                        <TouchableOpacity style={styles.floatingButton} onPress={() => convertJSONToCSV()}>
                            <FontAwesome5 name="share" size={24} color="white" />
                        </TouchableOpacity>
                          <TouchableOpacity style={styles.uploadBtn} onPress={handleReport}>
                              <Text style={{color:"white",fontFamily:"Poppins-SemiBold",fontSize:responsiveFontSize(2)}}>
                                 Generate Report
                              </Text>
                          </TouchableOpacity>

                  </View>

            

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
  uploadBtn: {
    width: "90%",
    display:"flex",
    // height: responsiveHeight(8),
    paddingVertical:12,
    borderRadius: 10,
    // borderWidth: 0.5,
    elevation:2,
    alignSelf: "center",
    justifyContent: "center",
    alignContent:"center",
    alignItems: "center",
    marginVertical: "4%",
    backgroundColor: "#2DDC4A",
  },

  floatingButton: {
    position: 'absolute',
    bottom: responsiveHeight(10), // Adjust the vertical position as needed
    right: responsiveWidth(5), // Adjust the horizontal position as needed
    width: responsiveWidth(10), // Adjust the button size as needed
    height: responsiveHeight(5), // Adjust the button size as needed
    borderRadius: 25, // Half of the width and height to create a circle
    backgroundColor: "#2DDC4A",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  }

});
