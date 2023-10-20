import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Image,
  Platform,
  ScrollView,
  Alert,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import * as FileSystem from "expo-file-system";

import { db, storage } from "../config";
// import {ref,set} from 'firebase/database'
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addGroceries, fetchGroceries } from "../../Reducers/GroceryReducer";
import { ref, getDownloadURL, uploadBytes } from "@firebase/storage";
import { Dropdown } from "react-native-element-dropdown";

export function AddGrocery() {
  const categoriesData = [
    {label:"Fruits & Vegetables",value:'Fruits & Vegetables'},
    {label:"Dairy & Bakery",value:'Dairy & Bakery'},
    {label:"Snacks",value:'Snacks'},
    {label:"Beverages",value:'Beverages'},
  ];
  const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };
  const navigation = useNavigation();
  const [imageData, setImageData] = useState(null);
 
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");

  const getImageSize = async (uri) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    const sizeInBytes = fileInfo.size;
    return sizeInBytes;
  };
  const dispatch = useDispatch();
  const dataAddOn = async () => {
    console.log("data add on");

    const payload = {
      name,
      price,
      // discount,
      description,
      category:value,
      imageData,
      stock
    };

    dispatch(addGroceries(payload));
    console.log("done");
    dispatch(fetchGroceries());
    console.log("done");
    navigation.push("Admin");
  };
  // const payload = {
  //     name,
  //   price,
  //   discount,
  //   description,
  //   imageData
  // }
  // try {

  //   const data = await fetch(`http://192.168.1.3:8082/myapp/addGrocery`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   });
  //   // console.log(await data.json());

  //   ToastAndroid.show("Data added successfully",ToastAndroid.LONG);
  //   navigation.push("Admin");
  // } catch (error) {
  //  Alert.alert("Data not added");
  // console.log(error);
  // }
  // console.log("I am in AddOn")
  // set(ref(db,'Grocery/'+name), {
  //   name:name,
  //   price:price,
  //   discount:discount,
  //   description:description,
  //   imageData:imageData
  // })
  // .then(() => {
  //   console.log('Data added successfully');
  //   setName('');
  //   setDescription('');
  //   setDiscount('');
  //   setPrice('');
  //   setImageData(null);
  // })
  // .catch((error) => {
  //   console.error('Error adding data: ', error);
  //   // Handle the error here (e.g., display an alert)
  // });

  // navigation.navigate('Admin')

  //to take Permission to access gallery
  const premit = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(status);

      if (status !== "granted") {
        alert("Permission Denied !");
      } else {
        pickImage();
      }
    }
  };

  //to pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing:true,
      // aspect:[4,3],
      // quality:1
    });
    console.log(result);
    if (!result.canceled) {
      // setImageData(result.assets[0].uri)
      // console.log(imageData)

      // const imageUri = result.assets[0].uri;
      // const imageSize = await getImageSize(imageUri);
      const uploadUrl = await uploadImageAsync(result.assets[0].uri);
      setImageData(uploadUrl);
      // .then((resp) => {
      //   console.log(uploadUrl);
      //   console.log(resp);
      //   setImageData(resp);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
      //  console.log(uploadUrl);

      // if (imageSize <= 200 * 1024) { // 50 KB in bytes
      //   // Image is smaller than 50 KB, you can use it
      //   // Your logic to use the image here

      //   setImageData(result.assets[0].uri)
      //   console.log(imageData)

      // } else {
      //   // Image is too large, display an error message
      //   console.log('Image size exceeds 50 KB');
      // }
    }
  };

  const uploadImageAsync = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storage, `Images/image-${Date.now()}`);
      const result = await uploadBytes(storageRef, blob);
      blob.close();

      return await getDownloadURL(storageRef);
    } catch (error) {
      // Alert.alert(`${error}`);
      console.log(error);
    }

    // We're done with the blob, close and release it
  };
  return (
    <ScrollView style={styles.container}>
      {/* {renderLabel()} */}
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.headerText}>Add Grocery</Text>
        </View> */}

        {imageData !== null ? (
          <Image source={{ uri: imageData }} style={styles.img}></Image>
        ) : null}

        <TextInput
          placeholder="Enter Grocery Name"
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        ></TextInput>
        <TextInput
          placeholder="Enter Grocery Price"
          style={styles.input}
          value={price}
          onChangeText={(text) => setPrice(text)}
        ></TextInput>
        <TextInput
          placeholder="Enter Stock"
          style={styles.input}
          value={stock}
          onChangeText={(text) => setStock(parseInt(text))}
        ></TextInput>
        <View style={{paddingHorizontal:20,marginTop: 30,}}>

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={categoriesData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Category' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
        </View>
        <TextInput
          placeholder="Enter Grocery Description"
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
        ></TextInput>

        <TouchableOpacity
          style={styles.pickImg}
          onPress={() => {
            premit();
          }}
        >
          <Text style={{color:"white",fontFamily:"Poppins-Bold"}}>Select Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadBtn} onPress={dataAddOn}>
          <Text style={{color:"white",fontFamily:"Poppins-Bold"}}>Upload Grocery</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "#fff",
    elevation: 5,
    paddingLeft: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "800",
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: "center",
  },
  pickImg: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#2DDC4A",
  },
  uploadBtn: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#2DDC4A",

    marginBottom: 75,
  },
  img: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  
});
