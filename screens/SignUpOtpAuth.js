import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ToastAndroid } from 'react-native';
import React,{ useEffect, useRef, useState} from 'react';
import { FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { auth, db, firebaseConfig } from '../Admin/config';
import firebase from 'firebase/compat/app';
import { useRoute } from '@react-navigation/native';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    
}
const OtpAuth = ({navigation}) => {
    // const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setverificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    
    const route = useRoute();
    const data = route.params.data;
    const phoneNumber=route.params.data.phone;
    const Name = route.params.data.Name;
    const email = route.params.data.email;
    const password = route.params.data.password;

    useEffect(() => {
      sendVerification();
    }, [])
    
    // console.log(data);
    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setverificationId);

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
    // try {
        
    //        const q = query(dbRef, where("email", "==", `${email}`));
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     // console.log(doc.id, " => ", doc.data());
    //     userExists = { ...doc.data() };
    //     // setUserD(doc.data())
    //   });
    //   if (userExists !== null) {
    //     alert("SignUp Failed! User Already exists")
    //     navigation.navigate("Login");
    //   } else {
    //     await createUserWithEmailAndPassword(auth, email, password);
    //     await addDoc(dbRef, payload);
    //     ToastAndroid.show("SignUp successfull", ToastAndroid.LONG);
    //   }
    // } catch (error) {
        
    // }
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
            <TextInput
                placeholder='Enter OTP'
                onChangeText={setCode}
                keyboardType='number-pad'
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.uploadBtn} onPress={confirmCode}>
                <Text style={{color:"white",fontFamily:"Poppins-Bold",fontSize:responsiveFontSize(2.5)}}>
                    Verify Phone Number
                </Text>
            </TouchableOpacity>

        </View>
    )

}

export default OtpAuth

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent:'center'
        
    },
    textInput:{
        fontSize:responsiveFontSize(2.5),
        marginBottom:20,
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
        paddingVertical:10,
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