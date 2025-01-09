
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView , Share} from 'react-native';
import { CustomCard } from '../components/Card.js';
import { CardTitle } from '../components/CardTitle.js';
import { CardContent } from '../components/CardContent.js';
import { Avatar, Title, Caption } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Profile = (props) => {

  const [userName, setUserName] = useState("");

  const navigation = useNavigation();

  useEffect(()=>{
    const getUserInfo= async()=>{
      const userName = await AsyncStorage.getItem('userName');
      console.log('userName',userName);
      setUserName(userName);
    }
    getUserInfo();
  });

  const myCustomerShare = async() =>{
    const shareOptions = {
      message: 'This is a test'
    }
    try{
      const shareResponse = await Share.share(shareOptions)
      console.log(shareResponse);
      }
      catch(error){
  console.log('Error', error)
      }
    }
  return (
    <SafeAreaView style={styles.container}>
         <CustomCard style={{backgroundColor:'white', borderRadius: 10, marginTop: 10, marginBottom:10 ,width: 340, shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4}}>
     <CardContent style={{marginTop:15}}>
      <View style={{flexDirection:'row', marginTop:15}}>
        <Avatar.Image
          source={{uri:null}}
          size={80} 
       />
      <View style={{marginLeft:20}}>
        <Text style={[styles.title, {
         marginTop:15,
         marginBottom:5
        }]}>{userName}</Text>

      </View>
      </View>

      <Text style={{marginTop:25,marginBottom:10, color:'#A0CE4E', fontSize:17, fontWeight:'bold'}}>Your Index Score balance progress</Text>

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox,{
       marginBottom:10,
       marginTop:5
    }]}>
        <Title>20</Title>
        <Caption>Weekly index score</Caption>
        <Text>radom balance</Text>
        </View>
        </View>
        <View>
        <View style={styles.infoBoxWrapper2}>
        <Title>50</Title>
        <Caption>Monthly index score</Caption>
        <Text>radom balance</Text>
        </View>
        </View>
   
      

     <View style={{ marginTop:30 }}>
      <TouchableOpacity 
      style={styles.shareButton}
       onPress={myCustomerShare}>
      <Text style={{color:'white'}}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton}
       onPress={()=>{
        AsyncStorage.removeItem("sessionToken");
        AsyncStorage.removeItem("onBoarded");
        props.setLoggedInState('NOT_LOGGED_IN');
        navigation.replace('Login');
        }} >
          <Text style={{color:'white',}}>Logout</Text>
        </TouchableOpacity>    
    </View>
    </CardContent>
    </CustomCard>
 </SafeAreaView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoBoxWrapper:{
borderBottomColor:'#dddddd',
borderBottomWidth:1,
borderTopColor:'#dddddd',
borderTopWidth:1,
marginTop:5,
height:100
  },
  infoBoxWrapper2:{
    borderBottomColor:'#dddddd',
    borderBottomWidth:1,
    marginTop:5,
    // flexDirection:'row',
    height:100
  },
  logoutButton:{
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginTop: 12,
    borderRadius:10
  },
  shareButton:{
    alignItems: 'center',
    backgroundColor: '#67a3d9',
    padding: 10,
    marginTop: 5,
    borderRadius:10
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
