import { View, Text,ActivityIndicator ,StyleSheet,FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../Reducers/UserReducer'
import { useState,useEffect } from 'react'
import UserCard from '../src/UserCard'
import { fetchOrders } from '../../Reducers/OrderReducer'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import axios from 'axios'
import { api_url } from '../../utils/api_url'


// import RNFetchBlob from 'react-native-fetch-blob';
// import XLSX from 'xlsx';


// import XLSX from 'xlsx';
// import RNFS from 'react-native-fs';

// import { FileSystem } from 'expo';
import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing';

import * as DocumentPicker from 'expo-document-picker';

import { Linking } from 'expo';


import { FontAwesome5 } from 'react-native-vector-icons';


// import * as IntentLauncher from 'expo-intent-launcher';

export default function AllUsers() {


   

    const dispatch=useDispatch()
    const users=useSelector((state)=>state.users.data)
    // console.log(users)
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
      dispatch(fetchUsers())
      .then(() => setIsLoading(false)) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false
      });
    }, [dispatch]);


   const handleReport = async()=>{
    const payload = users;
    try {
      const response = await axios.post(`${api_url}:8082/myapp/userReport`,JSON.stringify(payload),{
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

    const renderItem=({item})=>{
        console.log(item)
            return(
              <>
              <UserCard
              itemData={item}
              ></UserCard>
              </>
            
            )
           
          }

         
          


async function convertJSONToCSV() {
  const csv = Papa.unparse(users);
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
      saveFileToStorage(content,'users.csv')
      downloadFile(content,'data.csv','text/csv')

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





// async function pickAndSaveFile(content, fileName, mimeType) {
//   try {
//     const document = await DocumentPicker.getDocumentAsync({ type: 'file/.csv' });

//     if (document.type === 'success') {
//       const fileUri = document.uri;
//       const fileContent = content; // Replace this with your file content.

//       // Write the file to the selected location.
//       await FileSystem.writeAsStringAsync(fileUri, fileContent, { encoding: FileSystem.EncodingType.UTF8 });

//       console.log(`File saved at ${fileUri}`);
//     } else {
//       console.log('Document selection canceled');
//     }
//   } catch (error) {
//     console.error('Error picking and saving the file:', error);
//   }
// }





// async function downloadFile(content, fileName, mimeType) {
//   try {
//     // Save the file in the app's document directory
//     const fileUri = FileSystem.documentDirectory + fileName;
//     await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });

//     console.log(`File saved at ${fileUri}`);

//     // Construct the URL to open the file
//     const fileUrl = `file://${fileUri}`;

//     // Use Linking to open the file in a web browser
//     Linking.openURL(fileUrl);
//   } catch (error) {
//     console.error('Error downloading the file:', error);
//   }
// }

// async function copyFileToLocalStorage(filePath, newFileName) {
//   try {
//     // Get the local storage directory path
//     const localDir = FileSystem.documentDirectory;

//     // Define the destination path in local storage
//     const localPath = `${localDir}${newFileName}`;

//     // Copy the file from the original location to local storage
//     await FileSystem.copyAsync({
//       from: filePath, // The original file path
//       to: localPath,   // The destination in local storage
//     });

//     console.log(`File copied to local storage: ${localPath}`);
//     return localPath;
//   } catch (error) {
//     console.error('Error copying the file to local storage:', error);
//     return null;
//   }
// }


// async function openFileFromLocalStorage(localPath) {
//   try {
//     // Check if the file exists in local storage
//     const fileInfo = await FileSystem.getInfoAsync(localPath);

//     if (fileInfo.exists) {
//       console.log('File is located at:', fileInfo.uri);
//       console.log('Please open it using your preferred application.');

//       // You can provide instructions to the user to manually open the file
//     } else {
//       console.log('File does not exist in local storage.');
//     }
//   } catch (error) {
//     console.error('Error checking the file:', error);
//   }
// }

// Example usage:
// const localPath = 'file:///data/user/0/host.exp.exponent/files/my.csv'; // Replace with your local path
// openFileFromLocalStorage(localPath);


         // Example JSON data
const jsonData = [
  { Name: 'John', Age: 30 },
  { Name: 'Alice', Age: 25 },
  { Name: 'Bob', Age: 35 },
];


      
          
  return (
    <>
    {isLoading ? (
        <ActivityIndicator size="large" color="#06FF00" />
      ) : (
       

        
        
        <>
          <FlatList
                  style={styles.scrollableSection}
                  data={users}
                  renderItem={renderItem}
                  keyExtractor={item=>item.id}>
            </FlatList> 
            <View style={{backgroundColor:"white"}}>

            <TouchableOpacity style={styles.uploadBtn} onPress={handleReport}>
                <Text style={{color:"white",fontFamily:"Poppins-SemiBold",fontSize:responsiveFontSize(2)}}>
                   Generate Report
                </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.uploadBtn} onPress={()=>convertJSONToCSV()}>
                <Text style={{color:"white",fontFamily:"Poppins-SemiBold",fontSize:responsiveFontSize(2)}}>
                   Report
                </Text>
            </TouchableOpacity> */}

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