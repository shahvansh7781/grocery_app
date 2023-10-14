import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../Admin/config";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll } from "../Reducers/CartReducers";
import { useNavigation } from "@react-navigation/native";
import { loadUser } from "../Reducers/UserReducer";
import { fetchOrders } from "../Reducers/OrderReducer";

const ProfileScreen = () => {
  const user = useSelector((state) => state.users.user);
  const userProfile = useSelector((state) => state.users.userProfile);
  const userEmail = user && user.userData.email;
  const walletCoins = useSelector((state) => state.orders.walletCoins);
  console.log('user prof user prof - screen',userProfile&&userProfile);
  const navigation=useNavigation()
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(loadUser(userEmail))
    .then(() =>{setIsLoading(false)}) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false
      });
  }, [dispatch,walletCoins]);








  const [filterData,setFilterData]=useState([])
    const data=useSelector((state)=>state.orders.data)
    
    useEffect(() => {
      dispatch(fetchOrders())
      .then(() =>{dataFilter(); }) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        // In case of an error, also set isLoading to false
      });
    }, [dispatch]);


    const dataFilter=()=>{
         const filteredOrders = data.filter(order => order.userEmail === user.userData.email);
         setFilterData(filteredOrders)
    }
    




  return (
    <>
      {isLoading ? (
        
        <ActivityIndicator size="large" color="black" />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 90 }}>
              {/* <Avatar.Image
                        source={{
                            uri: 'Project1\assets\profile.png',

                        }}
                        size={80}
                    /> */}
              <View style={{ marginLeft: 20 }}>
                <Title
                  styles={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  {user.userData.Name}
                </Title>
                {/* <Caption styles={styles.caption}>deshana02</Caption> */}
              </View>
            </View>
          </View>
          <View style={styles.userInfoSection}>
            {/* <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                Baroda, India
              </Text>
            </View> */}
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
              {user.userData.phone}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
              {user.userData.email}
              </Text>
            </View>
          </View>
          <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                },
              ]}
            >
              <Title>{userProfile&&userProfile.walletCoins} coins</Title>
              <Caption>Wallet</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title>{filterData.length}</Title>
              <Caption>Orders</Caption>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            {/* <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Icon name="heart-outline" color="#38E54D" size={25} />
                <Text style={styles.menuItemText}>Favorites</Text>
              </View>
            </TouchableRipple> */}
            <TouchableRipple onPress={() => {navigation.navigate('MyOrders',{

              email:user.userData.email,
              role:'User'
              
            })}}>
              <View style={styles.menuItem}>
                <Icon name="credit-card" color="#38E54D" size={25} />
                <Text style={styles.menuItemText}>My Orders</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Icon name="account-edit" color="#38E54D" size={25} />
                <Text style={styles.menuItemText}>Edit Profile</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                auth.signOut();
                // dispatch(deleteAll())
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="logout" color="#38E54D" size={25} />
                <Text style={styles.menuItemText}>Sign Out</Text>
              </View>
            </TouchableRipple>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
