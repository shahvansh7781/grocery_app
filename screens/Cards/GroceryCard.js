import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import { Card, Title, Paragraph } from 'react-native-paper';
import  { add } from '../../Reducers/CartReducers';

export default function GroceryCard({item}) {

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
    <View>
      <Card  style={styles.card}>
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
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      height:'100%',
     
    },
    drawerButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      backgroundColor:'green',
      height:60,
      width:60,
      textAlign:'center',
      justifyContent:'center',
      alignItems:'center',
      
    },
    drawer: {
      position: 'absolute',
      top: 0,
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
  
    
  
    marginTop:100,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: '5%',
   
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
  
  
  
  
  
  