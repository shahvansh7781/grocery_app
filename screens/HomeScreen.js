import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Text, View, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItem, removeItem, setItem } from "../utils/asyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroceries } from "../Reducers/GroceryReducer";

import { Card, Title, Paragraph } from "react-native-paper";
import { add } from "../Reducers/CartReducers";
// import { Icon } from "react-native-vector-icons/icon";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import * as Updates from "expo-updates";

import * as Location from "expo-location";
// import Geocoding from 'react-native-geocoding';

import axios from 'axios'
import { addAddress, deleteAllAddress, updateAddress, updateCoor } from "../Reducers/AddressReducer";


// Geocoding.init({
//   baseUrl: 'https://nominatim.openstreetmap.org/',
//   // osmUsername: 'Rushit', // Set your OSM username here (required by Nominatim)
//   // osmPassword: 'Rushit2002', // Set your OSM password here (required by Nominatim)
// });

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Button, CardActionArea, CardActions } from '@mui/material';

export default function HomeScreen({ navigation }) {

  const [loadSelectedItem,setLoadSelectedItem]=useState(0)
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const [firstLoad, setFirstLoad] = useState(true);

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const data = useSelector((state) => state.groceries.data);

  const [filterData, setFilterData] = useState(data);

  // const [data,setData]=useState([])

  const cartData = useSelector((state) => state.Cart);

  const buttonList = [
    { id: 1, label: "All" },
    { id: 2, label: "Fruits & Vegetables" },
    { id: 3, label: "Dairy & Bakery" },
    { id: 4, label: "Snacks" },
    { id: 5, label: "Beverages" },
  ];

  const [activeCategory, setActiveCategory] = useState(1);

  const renderButton = ({ item }) => {
    if (item.id === activeCategory) {
      return (
        <TouchableOpacity style={styles.activebutton}>
          <Text
            style={styles.activebuttonText}
            onPress={() => setActiveCategory(item.id)}
          >
            {item.label}{" "}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => setActiveCategory(item.id)}
          >
            {item.label}{" "}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  // const filterByCategory=()=>{

  //   console.log('I am in filterBy Category')
  //    if (activeCategory===3){

  //     const results = filterData.filter((grocery) => {

  //       return grocery.price==='10'
  //     });
  //     console.log("filterByCAt",results)
  //     setFilterData(results)
  //    }
  //    else{
  //     setFilterData(data)
  //    }
  // }

  // useEffect(()=>{

  //   filterByCategory()

  // },[activeCategory])
  useEffect(() => {
    // Whenever the 'data' state changes, update 'filterData'
    setFilterData(data);
  }, [data]);

  useEffect(() => {
    // Fetch data and set isLoading accordingly
    
    (dispatch(fetchGroceries())
      .then(() => {setIsLoading(false);setActiveCategory(2);setActiveCategory(1);setFilterData(data);}) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false

         
        
      }));
    
    
    setFilterData(data)
    
    
      
    
    getLocationAsync()

    // console.log(location,address)
    

    setFirstLoad(false)
  }, [dispatch]);
  // useEffect(() => {
  //   // Fetch data and set isLoading accordingly

  //   dispatch(fetchGroceries())
  //     .then(() => {
  //       setIsLoading(false);
  //       setActiveCategory(2);
  //       setActiveCategory(1);
  //       setFilterData(data);
  //     }) // Data fetched, set isLoading to false
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(false); // In case of an error, also set isLoading to false
  //     });


         
        
  //     }));
    
    
  //   setFilterData(data)
    
    
      
    
  //   getLocationAsync()

  //   // console.log(location,address)
    

  //   setFirstLoad(false)

  // }, [dispatch]);

  useEffect(() => {
    setFilterData(data);
    // Debounce the handleSearch function

    const debounceSearch = setTimeout(() => {
      filterDataByCategoryAndSearch(searchQuery);
    }, 1000); // Adjust the delay time as needed

    // Cleanup the timeout when the component unmounts or when searchQuery changes
    return () => clearTimeout(debounceSearch);
  }, [searchQuery, activeCategory]);

  async function getLocationAsync() {
    setActiveCategory(1);

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.error("Location permission not granted");
      return;
    }

    // Get the current location
    const { coords } = await Location.getCurrentPositionAsync({});

    // Reverse geocode the coordinates
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
      );

      console.log(response.data);

      if (response.data && response.data.display_name) {
        // setAddress(response.data.display_name);

        const temp_addr=response.data.address.city+','+response.data.address.state +','+response.data.address.country//+','+response.data.address.postcode
        setAddress(temp_addr)
        const addr=response.data.display_name
        dispatch(updateAddress({address:{addr}}))

      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Address not found");
    }

    setLocation(coords);

    // dispatch(deleteAllAddress())
    // dispatch(addAddress({coords:location,address:address}))

    dispatch(updateCoor({ coords}));
    

    // dispatch(updateAddress({coords:location,address:address}))
    

  }

  const handleReset = async () => {
    await removeItem("onboarded");
    navigation.push("OnBoarding");
  };

  const handleAdmin = async () => {
    navigation.push("Admin");
    setIsDrawerOpen(false);
  };

  const handleUserDetails = async () => {
    navigation.push("UserDetails");
    setIsDrawerOpen(false);
  };
  const handleCart = async () => {
    navigation.navigate("Cart");
    setIsDrawerOpen(false);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const setAsynccart=async()=>{
    console.log('called')
    const stringValue = JSON.stringify(cartData);
    await removeItem("cart")
    await setItem('cart',stringValue)
    const storedValue = await getItem("cart");
    console.log(storedValue)


  }
  const handleAddToCart=(item)=>{
    // console.log(item.id)


   

    if (cartData && !cartData.some(cd => cd.id === item.id)) {

      
      dispatch(add({ id: item.id, image: item.imageData, price: item.price, count: 1, stock: 10, title: item.name }))
      console.log("Item added to the cart");
      // setAsynccart()
     
    } else if(!cartData){
      dispatch(add({ id: item.id, image: item.imageData, price: item.price, count: 1, stock: 10, title: item.name }))
      console.log("Item added to the cart");
      // setAsynccart()
  
    }
      
  
    
     
   
    
    navigation.navigate('Cart')
  }


//   const handleSearch=useCallback((searchQuery)=>{

    

//     // Use the filter method to find groceries by name
//   const searchResults = filterData.filter((grocery) => {
//     // Convert both the search query and grocery name to lowercase for case-insensitive search
//     const query = searchQuery.toLowerCase();
//     const name = grocery.name.toLowerCase();

//     // Check if the grocery name contains the search query
//     return (
//       name.startsWith(query) &&
//       (activeCategory === 1 || grocery.description === buttonList[activeCategory-1]['label'])
//     );
//   });

//   // Now, searchResults contains an array of matching groceries
//   console.log('Search results:', searchResults);
//   setFilterData(searchResults)
//   // You can update the state or perform any other actions with the search results here

// })
// Rushit_New - Start
// const filterDataByCategoryAndSearch = useCallback((searchQuery) => {
//   if (activeCategory === 2) {
//     // Filter by category if "Vegetables" is selected
//     const results = data.filter((grocery) => grocery.description === 'Fruit');
//     setFilterData(results.filter((grocery) =>
//     grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
//     );
//   } 
//   else if (activeCategory === 3){

//     const results = data.filter((grocery) => grocery.description === 'Vegetable');
//     setFilterData(results.filter((grocery) =>
//     grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
//     );

//   }
//   else if (activeCategory === 4){
//     const results = data.filter((grocery) => grocery.description === 'Dairy');
//     setFilterData(results.filter((grocery) =>
//     grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
//     );

//   }
//   else {
//     // Filter by search query for other categories
//     setFilterData((data.filter((grocery) =>
//     grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
//     ))
//   }
// });
//Rushit_New - Finish

  // Vansh_New - Start
//   const handleAddToCart = (item) => {
//     // console.log(item.id)

//     if (!cartData.some((cd) => cd.id === item.id)) {
//       dispatch(
//         add({
//           id: item.id,
//           image: item.imageData,
//           price: item.price,
//           count: 1,
//           stock: 10,
//           title: item.name,
//         })
//       );
//       console.log("Item added to the cart");
//     } else {
//       console.log("Item is already in the cart.");
//     }


//     navigation.navigate("Cart");
//   };
//Vansh_New - Finish
  
  //   const handleSearch=useCallback((searchQuery)=>{

  //     // Use the filter method to find groceries by name
  //   const searchResults = filterData.filter((grocery) => {
  //     // Convert both the search query and grocery name to lowercase for case-insensitive search
  //     const query = searchQuery.toLowerCase();
  //     const name = grocery.name.toLowerCase();

  //     // Check if the grocery name contains the search query
  //     return (
  //       name.startsWith(query) &&
  //       (activeCategory === 1 || grocery.description === buttonList[activeCategory-1]['label'])
  //     );
  //   });

  //   // Now, searchResults contains an array of matching groceries
  //   console.log('Search results:', searchResults);
  //   setFilterData(searchResults)
  //   // You can update the state or perform any other actions with the search results here

  // })

  const filterDataByCategoryAndSearch = useCallback((searchQuery) => {
    if (activeCategory === 2) {
      // Filter by category if "Vegetables" is selected
      const results = data.filter((grocery) => grocery.category === "Fruits & Vegetables");
      setFilterData(
        results.filter((grocery) =>
          grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      );
    } else if (activeCategory === 3) {
      const results = data.filter(
        (grocery) => grocery.category === "Dairy & Bakery"
      );
      setFilterData(
        results.filter((grocery) =>
          grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      );
      console.log(results);
    } else if (activeCategory === 4) {
      const results = data.filter((grocery) => grocery.category === "Snacks");
      console.log(results)
      setFilterData(
        results.filter((grocery) =>
          grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      );
    } else if (activeCategory === 5) {
      const results = data.filter((grocery) => grocery.category === "Beverages");
      setFilterData(
        results.filter((grocery) =>
          grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      );
    } 
    else {
      // Filter by search query for other categories
      setFilterData(
        data.filter((grocery) =>
          grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      );
    }
  });


  useEffect(() => {
    // Whenever activeCategory or searchQuery changes, set loadSelectedItem to 1
    setLoadSelectedItem(1);
    const delay = 1500; // 1 second in milliseconds
    const timerId = setTimeout(() => {
      setLoadSelectedItem(0);
    }, delay);
  
    // Cleanup the timeout when the component unmounts or when activeCategory or searchQuery changes
    return () => clearTimeout(timerId);
  }, [activeCategory, searchQuery]);
  

  return (
    <SafeAreaView style={{ marginTop: "10%",backgroundColor:"white" }}>
      {isLoading ? ( // Show a loading indicator while data is being fetched
        <ActivityIndicator size="large" color="#06FF00" />
      ) : (
        <View style={{backgroundColor:"white"}}>
          {/* {!isDrawerOpen && ( <TouchableOpacity onPress={toggleDrawer} style={styles.drawerButton}>
          <Text style={{fontSize:40}}>X</Text>
          
        </TouchableOpacity>)} */}
        <View style={styles.topContainer}>

          <Text
            style={{ fontSize: responsiveFontSize(3.5),marginLeft:responsiveWidth(3.5),fontFamily:"Poppins-Bold" }}
          >
            {" "}
            Welcome! {user ? user.userData.Name : ""}
          </Text>
          {/* {user ? <View style={{marginVertical:15}}> <Text> Welcome! </Text> </View> :  <></>} */}
          {/* Location */}

          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={30} color="#2DDC4A"></Icon>
            <Text style={styles.text}>{address}</Text>
          </View>

          {/* search */}

          <View style={styles.searchcartContainer}>
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="black" />
              <TextInput
                style={{fontSize:responsiveFontSize(2.5)}}
                placeholder="   Search Grocery"
                placeholderTextColor="black"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>

            <TouchableOpacity style={styles.cartContainer}>
              <Icon
                name="shopping-cart"
                size={30}
                color="#2DDC4A"
                onPress={handleCart}
              />
            </TouchableOpacity>
          </View>
        </View>

          {/* categories */}
          <Text style={styles.groceryHeader}>Categories </Text>

          <View>
            <FlatList
              data={buttonList}
              renderItem={renderButton}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
              contentContainerStyle={styles.buttonList} // Adjust container style
            />
          </View>

          {loadSelectedItem ? (
           <ActivityIndicator size="large" color="#06FF00"/>
               
              ) : (

          data &&
          filterData.length === 0 &&
          activeCategory === 1 &&
          firstLoad ? (
            <View 
            style={styles.scrollContainer}
            >
              <ScrollView
                contentContainerStyle={styles.cardContainer}
                horizontal
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              >
                {/* <Card style={styles.card}>
        <Card.Cover source={{ uri: data[0].imageData }} />
          <Card.Content >
            <Title >{data[0].name}</Title>
            <Paragraph>{data[0].desc}</Paragraph>
          </Card.Content>
      </Card> */}


        {filterData.map((item,index) => (
            <Card key={index} style={styles.card}>
            <Card.Cover source={{ uri: item.imageData }} style={{height:responsiveHeight(20)}} />
            <Card.Content style={styles.content}>
              <Title style={{fontSize:responsiveFontSize(2.5),fontWeight:400,fontFamily:"Poppins-SemiBold"}}>
                {item.name.length > 5 ? item.name.slice(0,7) + '...' : item.name}
                
                </Title>

              {/* <Paragraph style={{fontSize:14,color:'gray'}}>{item.description}</Paragraph> */}
              <Title style={{color:'#2DDC4A',fontSize:responsiveFontSize(2.5),fontFamily:"Poppins-Bold"}}>₹{item.price}</Title>

              <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addToCartButton}>
                  <Text style={{color:"white",fontFamily:"Poppins-SemiBold"}}>Add to Cart</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
          
))}

      </ScrollView></View>):<View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.cardContainer} horizontal refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
        

                {/* <Card style={styles.card}>

        <Card.Cover source={{ uri: data[0].imageData }} />
          <Card.Content >
            <Title >{data[0].name}</Title>
            <Paragraph>{data[0].desc}</Paragraph>
          </Card.Content>
      </Card> */}


        {filterData.map((item,index) => (
            <Card key={index} style={styles.card}>
              <Card.Cover source={{ uri: item.imageData }} style={{height:responsiveHeight(20)}} />
              <Card.Content style={styles.content}>
                <Title style={{fontSize:responsiveFontSize(2.5),fontWeight:400,fontFamily:"Poppins-SemiBold"}}>
                  {item.name.length > 5 ? item.name.slice(0,7) + '...' : item.name}
                  
                  </Title>

                {/* <Paragraph style={{fontSize:14,color:'gray'}}>{item.description}</Paragraph> */}
                <Title style={{color:'#2DDC4A',fontSize:responsiveFontSize(2.5),fontFamily:"Poppins-Bold"}}>₹{item.price}</Title>

                <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addToCartButton}>
                    <Text style={{color:"white",fontFamily:"Poppins-SemiBold"}}>Add to Cart</Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          
))}





      </ScrollView></View>)}
      
     


          
    {/* //Drawer */}
{user && user.userData.role==="Admin" ? <View style={[styles.drawer, { display: isDrawerOpen ? 'flex' : 'none' }]}>
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
        <TouchableOpacity onPress={handleUserDetails} style={styles.drawerItem}>
          <Text>My Profile</Text>
        </TouchableOpacity>
      </View>:<View style={[styles.drawer, { display: isDrawerOpen ? 'flex' : 'none' }]}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.drawerItem}>
          <Text>Close Drawer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} style={styles.drawerItem}>
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCart} style={styles.drawerItem}>
          <Text>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUserDetails} style={styles.drawerItem}>
          <Text>My Profile</Text>
        </TouchableOpacity>
      </View>}
    







        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  topContainer:{
      display:"flex",
      gap:10
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: "100%",
    marginBottom: responsiveHeight(10),
   
  },
  scrollContainer: {
    height: "90%", // 80% of the screen height
  },
  drawerButton: {
    // top: 0,
    // left: 0,

    backgroundColor: "green",
    height: 50,
    width: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  drawer: {
    position: "absolute",
    top: 20,
    left: 0,
    width: "80%",
    bottom: -100000,

    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },

  drawerItem: {
    padding: 12,
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },

  card: {
    // margin:'1%',
    // flexBasis: "48%",
backgroundColor:"white",
display:"flex",
elevation:2,
    width: responsiveWidth(45), // Adjust the width as needed
    marginHorizontal: responsiveWidth(2),
    height: responsiveHeight(40),
  },
  cardContainer: {
    // // marginTop:230,
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
    // padding: '5%',
    // // marginBottom:250,
    // // bottom:250
    // marginBottom:responsiveHeight(10)

    // flexDirection:"row",

    // paddingVertical: "5%",
  },

  content: {
    display:"flex",
    fontSize: 18, // Adjust the font size as needed
    gap:10,
    marginTop:4
  },
  addToCartButton: {
    display:"flex",
    backgroundColor: "#2DDC4A",
    height: 35,
    width: "90%",
    margin: "5%",
    marginLeft: 0,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    // padding: responsiveWidth(3),
    // paddingRight:responsiveWidth(10),
    // paddingBottom:responsiveWidth(1),
    // paddingTop:responsiveWidth(5),
    // backgroundColor: "white",
    // borderRadius: 10,
    marginLeft: responsiveWidth(4.5),
    // marginRight: responsiveWidth(5),
    // marginTop: responsiveWidth(3),
    // marginBottom: responsiveWidth(0),
    // elevation: 5,
  },
  text: {
    marginLeft: responsiveWidth(3), // Add spacing between the icon and text
    fontSize: responsiveFontSize(2.4),
    color: "gray",
    fontFamily:"Poppins-SemiBold"
  },
  searchContainer: {
    width: responsiveWidth(73.5),
    height: responsiveHeight(7),
    borderRadius: 10,
    // borderWidth: 0.5,
    // marginLeft: responsiveWidth(5),
    padding: responsiveWidth(4),
    // marginTop: responsiveHeight(2),
    // alignSelf: "center",
    backgroundColor: "rgba(242,242,242,0.6)",
    // elevation: 5,
    flexDirection: "row",
    alignItems:"center",
    // borderColor: "green",
    // borderWidth: 1,
  },
  buttonList: {
    padding: 10,
    marginBottom:25
  },
  button: {
    backgroundColor: "white",
    padding: responsiveWidth(2.5),
    borderRadius: 5,
    elevation:2,
    marginRight: responsiveWidth(2),
    // width: responsiveWidth(45),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  activebutton: {
    backgroundColor: "#2DDC4A",
    paddingVertical: responsiveWidth(2.5),
    paddingHorizontal:responsiveHeight(3.5),
    borderRadius: 5,
    marginRight: responsiveWidth(2),
    // width: responsiveWidth(45),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    fontFamily:"Poppins-SemiBold",
  },
  activebuttonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    color: "white",
    fontFamily:"Poppins-SemiBold",
  },
  groceryHeader: {
    // padding: responsiveWidth(4),
    // marginLeft:responsiveWidth(5),
    fontSize: responsiveFontSize(3.5),
    marginLeft:responsiveWidth(4),
    marginTop:responsiveWidth(4),
    fontFamily:"Poppins-SemiBold"
  },
  cartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginRight: responsiveWidth(5),
    backgroundColor: "white",
    width: responsiveWidth(15),
    height: responsiveHeight(6),
    // padding: responsiveWidth(3),
    // marginTop: responsiveHeight(2),
    // marginLeft: responsiveWidth(4),
    // borderRadius: 10,
    // borderWidth: 0.3,
    // borderColor: "green",
  },
  searchcartContainer: {
    flexDirection: "row", // Use flexDirection: 'row' for a horizontal layout
    alignItems: "center",
    justifyContent:"center",
    gap:5
  },
});
