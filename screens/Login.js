import React, { useEffect } from "react";//react is a javascript library for user interfaces
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// with react-navigation I can change screens from one component to another easily
import { useNavigation } from '@react-navigation/native';//this is another react hook

const Login = ({ loggedInState, loggedInStates, setLoggedInState }) => {

  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [oneTimePassword, setOneTimePassword] = React.useState("");

  const sendOTP = async () => {

      const loginResponse = await fetch(
        `https://dev.stedi.me/twofactorlogin/${phoneNumber}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/text'
          }
        }
      )
    if(loginResponse.status==200){
      setLoggedInState(loggedInStates.LOGGING_IN);
    } else{
      Alert.alert(`Invalid phone number: `+phoneNumber);
    }
  };

  const login = async () => {


    const loginResponse = await fetch(
      'https://dev.stedi.me/twofactorlogin',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/text'
        },
        body: JSON.stringify({
          phoneNumber,
          oneTimePassword
        }
        )
      }
    )
    if (loginResponse.status == 200) {//200 means the password was valid
      const sessionToken = await loginResponse.text();
      const userNameResponse = await fetch('https://dev.stedi.me/validate/' + sessionToken);
      const userName = await userNameResponse.text();
      console.log('sessionToken in Login Button', sessionToken);
      await AsyncStorage.setItem('sessionToken', sessionToken);//local storage
      await AsyncStorage.setItem('userName', userName);
      //   setLoggedInState(loggedInStates.LOGGED_IN);
      navigation.replace('Navigation')
    } else {
      console.log('response status', loginResponse.status);
      Alert.alert('Invalid', 'Invalid Login information')
      setLoggedInState(NOT_LOGGED_IN);
    }
  }


  useEffect(() => {
    if (loggedInState == loggedInStates.LOGGED_IN) {
      navigation.replace('Navigation');
    }
  })

  if (loggedInState == loggedInStates.NOT_LOGGED_IN) {
    return (
      <View style={styles.allBody}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          backgroundColor='#e6f0d5'
          placeholderTextColor='#818181'
          placeholder='Cell Phone'>
        </TextInput>


        <TouchableOpacity
          style={styles.sendButton}
          onPress={()=>{
            console.log(`ParseInt output: ${parseInt(phoneNumber).toString().length}`);
            if (parseInt(phoneNumber).toString().length < 10) {
              Alert.alert("Invalid Phone Number: " + phoneNumber)
            } else {
             sendOTP();
            }
          }}
        >
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>

      </View>
    )
  }
  else if (loggedInState == loggedInStates.LOGGING_IN) {
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
        {/* <View style={{...styles.allBody,flexDirection:"row"}}> */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={()=>{setLoggedInState(loggedInStates.NOT_LOGGED_IN)}}       
        >
          <Text style={{ color: 'white' }}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={login}
        >
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
        {/* </View> */}


      </View>
    )
  }
  //you should never see this text
  else if (loggedInState == loggedInStates.LOGGED_IN) {
    return (
      <View>
        <Text>you logged in</Text>
      </View>
    )
  }
}

export default Login




const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  allBody: {
    marginTop: 150,
    marginLeft: 20,
    marginRight: 20
  },
  input: {
    height: 45,
    marginTop: 25,
    //  borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  margin: {
    marginTop: 100
  },
  bioButton: {
    alignItems: 'center',
    backgroundColor: '#A0CE4E',
    padding: 10,
    marginTop: 5,
    borderRadius: 10
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: '#A0CE4E',
    padding: 10,
    marginTop: 8,
    borderRadius: 10
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#A0CE4E',
    padding: 10,
    marginTop: 8,
    borderRadius: 10
  },
  title: {
    textAlign: "center",
    color: '#A0CE4E',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 35
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginTop: 100,
    justifyContent: 'center'
  },
  paragraph: {
    textAlign: 'center'
  }

})
