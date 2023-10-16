import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ToastAndroid } from 'react-native';
import React,{ useEffect, useRef, useState} from 'react';
import { FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { auth, db, firebaseConfig } from '../Admin/config';
import firebase from 'firebase/compat/app';
import { useRoute } from '@react-navigation/native';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Timer from '../components/Timer';
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    
}
const OtpAuth = ({navigation}) => {
    // const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setverificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [timeOut, setTimeOut] = useState(false);
    const route = useRoute();
    const data = route.params.data;
    const phoneNumber=route.params.data.phone;
    const Name = route.params.data.Name;
    const email = route.params.data.email;
    

    useEffect(() => {
      sendVerification();
    }, [])
    
    // console.log(data);
    const sendVerification = () => {
        setTimeOut(!timeOut)
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setverificationId).catch((error)=>{
                navigation.navigate("SignUp")
            });

    };
    const confirmCode = async() => {
        const dbRef = collection(db, "Users");
        const payload = {
      email,
      Name,
      phone:phoneNumber,
      role: "User",
      walletCoins:0
    };
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
        .then(() => {
            addDoc(dbRef, payload);
            setCode('');
        })
        .catch((error) => {
            alert(error);
        })
        ToastAndroid.show("SignUp successfull", ToastAndroid.LONG);
    }

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            {/* <Text style={styles.otpText}>
                Login using OTP
            </Text> */}
            {/* <TextInput
            placeholder='pHONE NUMBER WITH COUNTRY CODE'
            onChangeText={setPhoneNumber}
            keyboardType='phone-pad'
            autoCompleteType='tel'
            style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                <Text style={styles.buttonText}>
                    send Verification
                </Text>
            </TouchableOpacity> */}
             <View style={{alignSelf:"flex-start",gap:10}}>
            <Text style={{fontFamily:"Poppins-Bold",fontSize:responsiveFontSize(4)}}>Verification</Text>
            <Text style={{fontFamily:"Poppins-SemiBold",fontSize:responsiveFontSize(2.5)}}>Enter the OTP just sent to you at {phoneNumber}</Text>
           </View>
            <TextInput
                placeholder='Enter OTP'
                onChangeText={setCode}
                keyboardType='number-pad'
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.uploadBtn} onPress={confirmCode}>
                <Text style={{color:"white",fontFamily:"Poppins-SemiBold",fontSize:responsiveFontSize(2.2)}}>
                    Verify Phone Number
                </Text>
            </TouchableOpacity>
            <View style={{flexDirection:"row",gap:4,alignSelf:"flex-start"}}>
                <Text style={{fontFamily:"Poppins-SemiBold"}}>Didn't receive SMS?</Text> 
            <TouchableOpacity onPress={sendVerification}><Text style={{color:timeOut ? "#2DDC4A":"gray",fontFamily:"Poppins-SemiBold"}}>Resend Code</Text></TouchableOpacity> 
            {
                timeOut ? <></> : <><Text style={{fontFamily:"Poppins-SemiBold"}}><Timer setTimeOut={setTimeOut}/> seconds</Text></>
            }
            </View>
        </View>
    )

}

export default OtpAuth

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        // justifyContent:'center',
        gap:20,
        paddingHorizontal:20
    },
    textInput:{
        fontSize:responsiveFontSize(2.5),
     
        textAlign:'center',
        color:'black',
        // elevation:2,
        borderRadius:10,
        width:"90%",
        paddingVertical:10,
    backgroundColor: "rgba(242,242,242,0.6)",

    },
    sendVerification:{
        padding:20,
        backgroundColor:'#349',
        borderRadius:10,
    },
    sendCode:{
        padding:20,
        backgroundColor:'#9b59b6',
        borderRadius:10,

    },
    buttonText:{
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold',
    },
    otpText:{
        fontSize:24,
        fontWeight:'bold',
        color:'black',
        margin:20

    },
    uploadBtn: {
        width: "90%",
        display:"flex",
        // height: responsiveHeight(8),
        paddingVertical:15,
        borderRadius: 10,
        // borderWidth: 0.5,
        elevation:2,
        alignSelf: "center",
        justifyContent: "center",
        alignContent:"center",
        alignItems: "center",
        // marginBottom: "4%",
        backgroundColor: "#2DDC4A",
      },
});