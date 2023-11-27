import React, { useEffect, useState,useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, Button, Alert,Linking,ImageBackground, SafeAreaView} from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import DeviceModal from "./DeviceConnectionModal";
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBLE from "./useBLE";

const Stack = createNativeStackNavigator();

const loggedInStates={
  NOT_LOGGED_IN:'NOT_LOGGED_IN',
  LOGGED_IN:'LOGGED_IN',
  LOGGING_IN:'LOGGING_IN'
}

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [loggedInState, setLoggedInState] = React.useState(loggedInStates.NOT_LOGGED_IN);
  const [sessionToken, setSessionToken] = React.useState("");
  const [onBoarded,setOnBoarded] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onBoardedRef = useRef(false);

  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    disconnectFromDevice,
  } = useBLE();

  const scanForDevices = async () => {
    
    const isPermissionsEnabled = await requestPermissions();
    console.log('Permission Enabled after requesting: '+isPermissionsEnabled);
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

    const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  useEffect(()=>{

  

    const getSessionToken = async()=>{
      const getOnBoarded = await AsyncStorage.getItem('onBoarded');
      setOnBoarded(getOnBoarded=='true');
      onBoardedRef.current='true'==getOnBoarded;
      console.log("onBoarded:", getOnBoarded);
      const sessionToken =  await AsyncStorage.getItem('sessionToken');
      console.log('sessionToken',sessionToken);
      
      if(sessionToken){
        const validateResponse = await fetch('https://dev.stedi.me/validate/'+sessionToken,
        {
          method:'GET',
          headers:{
            'content-type':'application/text'
          }
        }    
        );    
    
        if(validateResponse.status==200){//we know it is a good non-expired token
          const userName = await validateResponse.text();
          await AsyncStorage.setItem('userName',userName);//save user name for later
          setLoggedInState(loggedInStates.LOGGED_IN);
        }
      }
      console.log('app.js login:',loggedInState)
      let initialRouteName=onBoardedRef.current !=true ? 'Onboarding' : (loggedInState==loggedInStates.LOGGED_IN ? 'Navigation' : 'Login')
      console.log('initialRouteName: '+initialRouteName);
      console.log('onBoardedRef.current:'+onBoardedRef.current);
        // if(getOnBoarded != 'true'){
        //     navigation.replace('Onboarding')
        //   }else if (loggedInState==loggedInStates.LOGGED_IN){
        //       navigation.replace('Navigation')
        //   }else if(loggedInState==loggedInStates.NOT_LOGGED_IN){
        //       console.log('going to login screen:',loggedInState)
        //       // navigation.replace('Login')
        //   }      
    }
    
    getSessionToken();
  
  },[]); 

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <>
            <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
            <Text style={styles.heartRateText}>{heartRate} bpm</Text>
          </>
        ) : (
          <Text style={styles.heartRateTitleText}>
            Please Connect to a Heart Rate Monitor
          </Text>
        )}
      </View>      
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />      
    </SafeAreaView>
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{headerShown:false}}>
    //     {/* We only show the Onboarding component the first time they run the app*/}
    //     {onBoarded ? null : (<Stack.Screen name='Onboarding' children={()=><OnboardingScreen setFirstLaunch={setFirstLaunch} loggedInStates={loggedInStates} loggedInState={loggedInState}/>}/>)}
    //     {/* We  show the login component if they don't have a valid login token already stored in the app*/}        
    //     <Stack.Screen name='Login' children={()=><Login loggedInStates={loggedInStates} loggedInState={loggedInState} setLoggedInState={setLoggedInState} setSessionToken={setSessionToken}/>}/>
    //     {/* If they have logged in, and seen the onboarding component, we show them the tabbed navigation component*/}  
    //     <Stack.Screen name='Navigation' children={()=><Navigation loggedInStates={loggedInStates} loggedInState={loggedInState} setLoggedInState={setLoggedInState} sessionToken={sessionToken}/>}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

 export default App;




