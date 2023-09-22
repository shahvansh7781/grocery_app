import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity, ActivityIndicator,StyleSheet,FlatList, ScrollView } from "react-native";
import { Text, View ,Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeItem } from "../utils/asyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroceries } from "../Reducers/GroceryReducer";

import { Card, Title, Paragraph } from 'react-native-paper';
import { add } from "../Reducers/CartReducers";


// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Button, CardActionArea, CardActions } from '@mui/material';


export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const data=useSelector((state) => state.groceries.data)
  const cartData=useSelector((state)=>state.Cart)
  // r

  useEffect(() => {
    // Fetch data and set isLoading accordingly
    dispatch(fetchGroceries())
      .then(() => setIsLoading(false)) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false

        
      });
  }, [dispatch]);

  const handleReset = async () => {
    await removeItem("onboarded");
    navigation.push("OnBoarding");
  };

  const handleAdmin = async () => {
    navigation.push("Admin");
  };

  const handleCart = async () => {
    navigation.push("Cart");
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleAddToCart=(item)=>{
    // console.log(item.id)

    if (!cartData.some(cd => cd.id === item.id)) {

      
      dispatch(add({ id: item.id, image: item.imageData, price: item.price, count: 1, stock: 10, title: item.name }))
      console.log("Item added to the cart");
    } else {
      console.log('Item is already in the cart.');
    }
  

    
    navigation.push('Cart')
  }
  return (
    <SafeAreaView >
      
      {isLoading ? ( // Show a loading indicator while data is being fetched
        <ActivityIndicator size="large" color="#06FF00" />
      ) : (
        <>
          
         {!isDrawerOpen && ( <TouchableOpacity onPress={toggleDrawer} style={styles.drawerButton}>
          <Text style={{fontSize:40}}>X</Text>
        </TouchableOpacity>)}


        {data && data.length > 0 ?( <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.cardContainer}>
        {/* <Card style={styles.card}>
        <Card.Cover source={{ uri: data[0].imageData }} />
          <Card.Content >
            <Title >{data[0].name}</Title>
            <Paragraph>{data[0].desc}</Paragraph>
          </Card.Content>
      </Card> */}

        {data.map((item,index) => (
            <Card key={index} style={styles.card}>
              <Card.Cover source={{ uri: item.imageData }} />
              <Card.Content>
                <Title style={{fontSize:20,fontWeight:400}}>{item.name}</Title>

                <Paragraph style={{fontSize:14,color:'gray'}}>{item.description}</Paragraph>
                <Title style={{color:'green'}}>{item.price}</Title>

                <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addToCartButton}>
                    <Text >Add to Cart</Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          
))}

      </ScrollView></View>):<Text>Empty</Text>}
      
     


          
    {/* //Drawer */}

    <View style={[styles.drawer, { display: isDrawerOpen ? 'flex' : 'none' }]}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.drawerItem}>
          <Text>Close Drawer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} style={styles.drawerItem}>
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdmin} style={styles.drawerItem}>
          <Text>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCart} style={styles.drawerItem}>
          <Text>Cart</Text>
        </TouchableOpacity>
      </View>






        </>
      )}

     
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    height:'100%',
    
   
  },
  scrollContainer: {
    height: '95%', // 80% of the screen height
  },
  drawerButton: {
   
    // top: 0,
    // left: 0,
    
    backgroundColor:'green',
    height:50,
    width:50,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    
  },
  drawer: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: '80%',
    bottom:-100000,
   
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
 
  drawerItem: {
    padding: 12,
    marginTop:20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  card:{
    
    margin:'1%',
    flexBasis: "48%",
   
    
  },
 cardContainer:{

  

  // marginTop:230,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: '5%',
  // marginBottom:250,
  // bottom:250
  
 
 },

 
 content:{
  fontSize: 18, // Adjust the font size as needed
  fontWeight: 'bold',

 },
 addToCartButton:{
  backgroundColor:'green',
  height:35,
  width:'90%',
  margin:'5%',
  marginLeft:0,
  marginBottom:0,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:10

 }
});





