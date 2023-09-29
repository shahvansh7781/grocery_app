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

export function AddGrocery() {
  const navigation = useNavigation();
  const [imageData, setImageData] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
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
      discount,
      description,
      imageData,
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Grocery</Text>
        </View>

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
          placeholder="Enter Discount"
          style={styles.input}
          value={discount}
          onChangeText={(text) => setDiscount(text)}
        ></TextInput>
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
          <Text>Pick Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadBtn} onPress={dataAddOn}>
          <Text>Upload Grocery</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderWidth: 0.5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#06FF00",
  },
  uploadBtn: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#06FF00",

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
