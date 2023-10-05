import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase/compat';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroceries, fetchGroceries } from '../../Reducers/GroceryReducer';
import { useEffect } from 'react';

// import StarRating from './StarRating';

// const deleteGrocery = async(itemKey) => {

//   // console.log("i am in deleteGrocery")
//   // console.log(itemKey);
//   const id = {itemKey};
//   console.log(id);
//   try {
//     const data = await fetch(`http://192.168.1.10:8082/myapp/deleteGrocery`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body:JSON.stringify(id)
//     });
//     const resp = await data.json();
//     // console.log(await data.json());
//     console.log(resp);
//   } catch (error) {
//     Alert.alert("Not deleted");
//   }
  // const db = firebase.database();
  // const ref = db.ref(`Grocery/${itemKey}`); 

  // ref
  //   .remove()
  //   .then(() => {
  //     console.log('Data deleted successfully.');
  //   })
  //   .catch((error) => {
  //     console.error('Error deleting data:', error);
  //   });
// };



const Card = ({itemData}) => {

  const navigation=useNavigation()
  const dispatch=useDispatch()

  const isLoading = useSelector((state) => state.groceries.isLoading);
  const error = useSelector((state) => state.groceries.error);


  // Define a function to delete data
  const handleDelete = (itemKey) => {
    console.log("I am in Handle Delete")
    // console.log(itemData);
    // deleteGrocery(itemData.id);
    // console.log(itemData.id)
    // dispatch(deleteGroceries(itemData.id))

    // console.log('Done')
    // dispatch(fetchGroceries())
    // Dispatch the deleteGroceries action
    dispatch(deleteGroceries(itemKey))
      .then(() => {
        // If successful, refresh data by fetching groceries again
        // dispatch(fetchGroceries());

        // navigation.dispatch(StackActions.replace('Admin'));
      })
      .catch((error) => {
        // Handle error, show an alert, or log it
        console.error('Error deleting grocery:', error);
      });
    
    console.log('Done')
    navigation.navigate('Home')
    navigation.navigate('Admin')
    console.log("Navigation done")
  };
 
  return (
   
    <View  style={styles.container}>
       {/* {isLoading && <p>Loading...</p>}
       {error && <p>Error: {error}</p>} */}
    <TouchableOpacity    >
      <View style={styles.card} >
        <View >
          <Image
            source={{uri : itemData.imageData}}
            resizeMode="cover"
            style={styles.cardImg}
         
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{itemData.name}</Text>
          <Text style={styles.cardTitle}>{itemData.price}</Text>
          <Text style={styles.cardTitle}>{itemData.discount}</Text>
          {/* <StarRating ratings={itemData.ratings} reviews={itemData.reviews} /> */}
          <Text numberOfLines={2} style={styles.cardDetails}>{itemData.description}</Text>

          
        </View>
        
        <View>
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate('EditGrocery',{
              data:itemData,
              id:itemData.id
            })

          }}>
              <Image source={require('../Images/edit.png')} style={styles.icon}></Image>
             
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{Alert.alert(
                      'Confirm Title',
                      'Do you want to proceed?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {
                            // Handle Cancel button press
                            console.log('Confirm Cancel pressed');
                          },
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            // Handle OK button press
                            console.log('Confirm OK pressed');
                            handleDelete(itemData.id)
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                          }}>
              <Image source={require('../Images/delete.png')} style={styles.icon} ></Image>
              
          </TouchableOpacity>
           
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({

  container:{
    flex:1
  },
  card: {
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    backgroundColor:'#fff',
    elevation:4,
    marginTop:10,
    borderRadius:10,
    height:100,
    marginBottom:10
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
   width:90,
   height:90,
   borderRadius:10,
   margin:5
  },
  cardInfo: {
    flex:2,
    padding: 10,
    backgroundColor: '#fff',
    
  },
  cardTitle: {
    fontWeight: 'bold',
    
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  icon:{
    width:24,
    height:24,
    margin:10

  }
});