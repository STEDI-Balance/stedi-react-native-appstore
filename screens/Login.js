// import react libraries

import React, {useEffect} from "react";//react is a javascript library for user interfaces
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";

// with asyncstorage I can save data on the device locally (ex: a login token)
import AsyncStorage from '@react-native-async-storage/async-storage';

// with react-navigation I can change screens from one component to another easily
import { useNavigation } from '@react-navigation/native';//this is another react hook

// Login is a component name and it is the same name as the javascript file it resides in
// There are 2 kinds of components: class-based, and functional components
// if the component name doesn't say class before it, then it's functional (like below)

//When passing parameters to a javascript function you can pass an object or plain parameter
//Curly braces mean you're passing an object and the fields inside belong to that object
//Plain parameters are position based which means you have to send them in the right order


// React components call their parameters "props" short for "properties"
const Login = ({loggedInState, loggedInStates,setLoggedInState})=>{
// I have 3 props in this component:
//  loggedInState
//  loggedInStates
//  setLoggedInState - it's a setter (function) to update loggedInState

      const navigation = useNavigation();//we call the hook here to create a navigation object


      // these are called state variables because they maintain the internal state of the component
      const [emailAddress,setEmailAddress] = React.useState("");// this is how we make a state field and its setter
      const [password, setPassword] = React.useState("");

      // const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
      // const [isBiometricEnrolled, setIsBiometricEnrolled] = React.useState(false);

// use effect is a hook - that means a special react function that accesses the 
// react framework in a way that is unique
// the useEffect hook lets you make application adjustments after each time the screen updates

// so what is the below example doing after the screen updates?
 useEffect(()=>{
  if(loggedInState==loggedInStates.LOGGED_IN){//if they are logged in...
    navigation.replace('Navigation');//changes screens to the home screen with all the tabs
  }
 })    

 if(loggedInState==loggedInStates.NOT_LOGGED_IN){// every react component must return a view or a fragment
    return (

      //this is a View -- a View is a top level React Native Component- so everything has to be inside of a View
      // it is very similar to a div in HTML (a section of the page)
      <View style={styles.allBody}>
        <Text style={styles.title}>Welcome Back</Text>
            {/* <Text style={styles.paragraph}> {isBiometricSupported ? 'Your device is compatible with Biometrics' 
        : 'Your device is not compatible with Biometrics'}
            </Text>        
            <Text style={styles.paragraph}> {isBiometricEnrolled ? 'You have saved a fingerprint or face' 
        : 'You have not saved a fingerprint or face'}
            </Text>            */}
              <TextInput 
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={styles.input}
              backgroundColor='#e6f0d5'
              placeholderTextColor='#818181' 
              placeholder='Email Address'>          
               </TextInput>

            {/* <TouchableOpacity
             style={styles.bioButton}
              onPress={async () => {  
                const biometricAuth = await LocalAuthentication.authenticateAsync({
                      promptMessage: 'Login with Biometrics',
                      disableDeviceFallback: true,
                      cancelLabel:"cancel"
                    });
              }}
            >
            <Text style={{color:'white'}}>Biometric Authentication</Text>
            </TouchableOpacity> */}

             {/* <Text style={{fontSize:20, marginVertical:30, textAlign:'center', color:'#818181'}}>Or</Text> */}

            <TouchableOpacity
               style={styles.sendButton}
              onPress={async ()=>{
                console.log(emailAddress+' was entered')
                
                //what should the URL be to log in using a username and password below?
                // how would I find out without Brother Murdock in the room?
                // const sendTextResponse=await fetch(
                //   'https://dev.stedi.me/login',
                //   {
                //     method:'POST',
                //     headers:{
                //      'content-type':'application/text'
                //    },
                //     body:JSON.stringify({//this converts a javascript object to a string -- fetch requires a string for the body
                //       userName:emailAddress,
                //       password// this is the same as saying password:password - but we have no password variable yet
                //     })
                //   }
                // )
                // const sendTextResponseData = await sendTextResponse.text();
                // if(sendTextResponse.status!=200){//invalid phone number, send them to the signup page
                //   await Alert.alert("Did you type your number correctly? "+phoneNumber);
                // } else{
                   setLoggedInState(loggedInStates.LOGGING_IN);
                // }
              }}
            >
              <Text style={{color:'white'}}>Login</Text>      
            </TouchableOpacity>
    
          </View>
        )
      }
     else if(loggedInState==loggedInStates.LOGGING_IN){
        return (
          <View style={styles.allBody}>
          <TextInput 
            value={password}
            onChangeText={setPassword}
            style={styles.input}  
            placeholderTextColor='#818181' 
            backgroundColor='#e6f0d5'
            placeholder='Password'   
            secureTextEntry={true}>
          </TextInput>
          <TouchableOpacity
              style={styles.loginButton}
              onPress={async ()=>{
                
    
                const loginResponse= await fetch(
                  'https://dev.stedi.me/login',
                  {
                    method:'POST',
                    headers:{
                     'content-type':'application/text'
                   },
                    body:JSON.stringify({
                      userName:emailAddress,
                      password// this is the same as saying password:password - but we have no password variable yet
                    })
                  }
                )
                if(loginResponse.status==200){//200 means the password was valid
    
                  const sessionToken = await loginResponse.text();
                  console.log('sessionToken in Login Button',sessionToken);
                  await AsyncStorage.setItem('sessionToken',sessionToken);//local storage
                //   setLoggedInState(loggedInStates.LOGGED_IN);
                  navigation.replace('Navigation')
                } else{
                  console.log('response status',loginResponse.status);
                  Alert.alert('Invalid','Invalid Login information')
                  setLoggedInState(NOT_LOGGED_IN);
                }
              }}
              >
              <Text style={{color:'white'}}>Login</Text>
              </TouchableOpacity>
              
    
          </View>
     )}
     //you should never see this text
     else if (loggedInState==loggedInStates.LOGGED_IN){
      return(
        <View>
          <Text>you logged in</Text>
        </View>
      )}
}

export default Login



 
 const styles = StyleSheet.create({
     container:{
         alignItems:'center',
         justifyContent: 'center',
     },
     allBody:{
     marginTop:150,
     marginLeft:20,
     marginRight:20
     },
     input: {
       height: 45,
       marginTop: 25,
      //  borderWidth: 1,
       padding: 10,
       borderRadius: 10,
       marginBottom:15,
     },
     margin:{
       marginTop:100
     },
     bioButton:{
      alignItems: 'center',
      backgroundColor: '#A0CE4E',
      padding: 10,
      marginTop: 5,
      borderRadius:10
     },
     sendButton:{
    alignItems: 'center',
    backgroundColor: '#A0CE4E',
    padding: 10,
    marginTop: 8,
    borderRadius:10
     },
     loginButton:{
      alignItems: 'center',
      backgroundColor: '#A0CE4E',
      padding: 10,
      marginTop: 8,
      borderRadius:10
     },
     title:{
      textAlign:"center",
      color:'#A0CE4E',
      fontSize:40, 
      fontWeight:'bold',
      marginBottom:35
     },
     image: {
      flex: 1,
      justifyContent: 'center',
    },     
    tinyLogo: {
      width: 50,
      height: 50,
      marginTop:100,
      justifyContent:'center'
    },
    paragraph:{
      textAlign:'center'
    }
  
 })
