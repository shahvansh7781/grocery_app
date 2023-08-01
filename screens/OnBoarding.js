import React, { Component ,useEffect} from 'react'
import { Text, View ,StyleSheet, Dimensions,Image} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { setItem } from '../utils/asyncStorage';


const {width,height}=Dimensions.get('window')

export default function OnBoarding () {
    
    
  
    const navigation=useNavigation()
    const handleDone=()=>{
        navigation.navigate('Home')
        setItem('onboarded','1')
    }
    const doneButton=({...props})=>{
        return(
            <TouchableOpacity style={styles.btn} {...props}>
                <Text style={styles.btn_font}>Get Started ! </Text>
            </TouchableOpacity>
        )
    }
    const skipButton=({...props})=>{
        return(
            <TouchableOpacity style={styles.btn} {...props}>
                <Text style={styles.btn_font}>Skip</Text>
            </TouchableOpacity>
        )
    }
    const nextButton=({...props})=>{
        return(
            <TouchableOpacity style={styles.btn} {...props}>
                <Text style={styles.btn_font}>Next</Text>
            </TouchableOpacity>
        )
    }
   
    return (
      <View style={styles.container}>
        
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                DoneButtonComponent={doneButton}
                SkipButtonComponent={skipButton}
                NextButtonComponent={nextButton}
                bottomBarHighlight={false}
                containerStyles={{paddingHorizontal:15}}
                titleStyles={{fontSize:25,color:'#19FF00'}}
                pages={[
                    {
                    backgroundColor: '#fff',
                    image: (
                        <View >
                            <Image style={styles.lottie} source={require('../assets/grocery1.gif')}></Image>
                        </View>)
                        
                    ,
                    title: '"Shop Fresh, Shop Fast" ',
                    subtitle: 'Your one-stop destination for all your grocery needs',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                <Image style={styles.lottie} source={require('../assets/fresh.gif')}></Image>
                            </View>)
                            
                        ,
                        title: '"Freshness Guaranteed"',
                        subtitle: 'We source the finest produce for you and your family',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                 <Image style={styles.lottie} source={require('../assets/grocery3.gif')}></Image>
                            </View>)
                            
                        ,
                        title: '"Save Time, Skip the Lines" ',
                        subtitle: "Order from the comfort of your home, and we'll deliver it to your doorstep",
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                 <Image style={styles.lottie} source={require('../assets/cart.gif')}></Image>
                            </View>)
                            
                        ,
                        title: '"Effortless Grocery Shopping"',
                        subtitle: 'From Cart to Kitchen in No Time.',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                 
                            </View>)
                            
                        ,
                        title: 'Get started !',
                        subtitle: 'Enjoy the convenience of online grocery shopping! Happy Shopping!',
                    },
                    
                ]}
            />
       
      </View>
    )
  }



const styles= StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:'white'
        },
        lottie:{
            width:width*0.9,
            height:width
        },
        btn:{
            padding:20,
            backgroundColor:'white',
            borderRadius:10,
            backgroundColor:'#06FF00',
            width:100,
            height:35,
            margin:10,
            marginBottom:30,
            padding:5,
            alignItems:'center',

          
        },
        btn_font:{
              }
    }
)
