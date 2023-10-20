import { View, Text,StyleSheet,SafeAreaView ,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize,responsiveHeight ,responsiveWidth} from "react-native-responsive-dimensions";
import OrderCard from '../src/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchOrders } from '../../Reducers/OrderReducer';

import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing';

import { FontAwesome5 } from 'react-native-vector-icons';

export default function AllOrders() {

  const dispatch=useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const data=useSelector((state)=>state.orders.data)
  // console.log("AllOrders",data)
  
  useEffect(() => {
    dispatch(fetchOrders())
    .then(() => setIsLoading(false)) // Data fetched, set isLoading to false
    .catch((error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false); // In case of an error, also set isLoading to false
    });
  }, [dispatch]);

  const renderItem=({item})=>{
    console.log(item)
        return(
          <OrderCard
          itemData={item}
          ></OrderCard>
        
        )
       
      }
      function unwrapItems(data) {
        const result = [];
      
        for (const order of data) {
          const { id, userName, userEmail, shippingAddress, status, subTotal, deliveryCharge, grandTotal, items } = order;
      
          for (const item of items) {
            const { id: itemId, title: itemTitle, price: itemPrice, count: itemCount, image: itemImage, stock: itemStock } = item;
            result.push({
              id,
              userName,
              userEmail,
              shippingAddress,
              status,
              subTotal,
              deliveryCharge,
              grandTotal,
              itemId,
              itemTitle,
              itemPrice,
              itemCount,
              itemImage,
              itemStock,
            });
          }
        }
      
        return result;
      }
      
     
      
     
     
     
      
 
async function convertJSONToCSV() {


 

  const temp=unwrapItems(data)
  const csv = Papa.unparse(temp);
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
            saveFileToStorage(content,'orders.csv')
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
       
          <FlatList
                  style={styles.scrollableSection}
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item=>item.id}>
            </FlatList> 

            <View style={{backgroundColor:"white"}}>


                    <TouchableOpacity style={styles.floatingButton} onPress={() => convertJSONToCSV()}>
                      <FontAwesome5 name="share" size={24} color="white" />
                    </TouchableOpacity>

            </View>
            

        </>
      
   )}

        
    </> 
  
  )
}


const styles= StyleSheet.create({
    // container:{
    //   flex:1,
      
    // //   flexDirection: 'column', 
    //   backgroundColor:'white'
     
    // },
    
   
    // scrollableSection: {
    //   // height:'20%', // Take the other half of the available width
    //   flex:0.9,
    //   backgroundColor: 'white',
    
    // },
    scrollableSection: {
        height: "100%", // Take the other half of the available width
        backgroundColor: "white",
       
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
  })