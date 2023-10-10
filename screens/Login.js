import React, {useEffect} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = ({loggedInState, loggedInStates,setLoggedInState})=>{

      const navigation = useNavigation();

      const [userName,setUserName] = React.useState("");
      const [oneTimePassword, setOneTimePassword] = React.useState("");

 useEffect(()=>{
  if(loggedInState==loggedInStates.LOGGED_IN){
    navigation.replace('Navigation');
  }
 })    

 if(loggedInState==loggedInStates.NOT_LOGGED_IN){
    return (
      <View style={styles.allBody}>
        <Text style={styles.title}>Welcome Back</Text>
              <TextInput 
              value={userName}
              onChangeText={setUserName}
              style={styles.input}
              backgroundColor='#e6f0d5'
              placeholderTextColor='#818181' 
              placeholder='Enter Name Here'>          
               </TextInput>

  
            <TouchableOpacity
               style={styles.sendButton}
              onPress={async ()=>{
                console.log(userName +' Button was pressed')
    
                const sendTextResponse=await fetch(
                  'https://dev.stedi.me/twofactorlogin/'+userName,
                  {
                    method:'POST',
                    headers:{
                     'content-type':'application/text'
                   }
                  }
                )
                const sendTextResponseData = await sendTextResponse.text();
                if(sendTextResponse.status!=200){//invalid entry, send them to the signup page
                  await Alert.alert("Hello " + userName);
                } else{
                  setLoggedInState(loggedInStates.LOGGING_IN);
                }
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
            value={oneTimePassword}
            onChangeText={setOneTimePassword}
            style={styles.input}  
            placeholderTextColor='#818181' 
            backgroundColor='#e6f0d5'
            placeholder='One Time Password'   
            keyboardType='numeric'>
          </TextInput>
          <TouchableOpacity
              style={styles.loginButton}
              onPress={async ()=>{
                console.log(userName+' Button was pressed')
    
                const loginResponse=await fetch(
                  'https://dev.stedi.me/twofactorlogin',
                  {
                    method:'POST',
                    headers:{
                     'content-type':'application/text'
                    },
                    body:JSON.stringify({
                      userName,
                      oneTimePassword
                    }
                    )
                  }
                )
                if(loginResponse.status==200){//200 means the password was valid
                  const sessionToken = await loginResponse.text();
                  const userNameResponse = await fetch('https://dev.stedi.me/validate/'+sessionToken);
                  const userName = await userNameResponse.text();
                  console.log('sessionToken in Login Button',sessionToken);
                  await AsyncStorage.setItem('sessionToken',sessionToken);//local storage
                  await AsyncStorage.setItem('userName',userName);
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
