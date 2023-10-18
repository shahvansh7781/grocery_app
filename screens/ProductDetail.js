import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../Reducers/CartReducers';

const ProductDetail = ({navigation}) => {

    const route = useRoute();
    const item = route.params.item;
    console.log(item)
    const dispatch = useDispatch();
    
    const cartData = useSelector((state) => state.Cart);
    const handleCart = ()=>{
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
  return (
      <ScrollView style={{backgroundColor:"white",flex:1}}>
    <View style={{backgroundColor:"white",flex:1,gap:10}}>
      <Text style={{fontFamily:"Poppins-Bold",fontSize:responsiveFontSize(3.5),marginTop:15,marginLeft:10}}>{item.name}</Text>
      <Image source={{uri:item.imageData}} height={responsiveHeight(40)} width={responsiveWidth(100)} style={{paddingHorizontal:10}}/>
      <View>
      <Text style={{fontFamily:"Poppins-Bold",fontSize:responsiveFontSize(4),marginLeft:10}}>₹{item.price}</Text>
        
      <Text style={{fontFamily:"Poppins-Bold",fontSize:responsiveFontSize(3.5),marginLeft:10}}>Description:</Text>

      <Text style={{fontFamily:"Poppins-Light",fontSize:responsiveFontSize(2.2),marginLeft:10}}>t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of.more-or-less normal distribution of.</Text>
      </View>
      <TouchableOpacity style={styles.uploadBtn} onPress={handleCart}>

<Text style={{color:"white",fontFamily:"Poppins-Bold",fontSize:responsiveFontSize(2.5)}}>Add to Cart</Text>
</TouchableOpacity>
    </View>
      </ScrollView>
  )
}

export default ProductDetail;

const styles = StyleSheet.create({
    uploadBtn: {
        width: "90%",
        display:"flex",
        // height: responsiveHeight(8),
        paddingVertical:10,
        borderRadius: 10,
        // borderWidth: 0.5,
        elevation:2,
        alignSelf: "center",
        justifyContent: "center",
        alignContent:"center",
        alignItems: "center",
        marginBottom: "4%",
        backgroundColor: "#2DDC4A",
      },
})