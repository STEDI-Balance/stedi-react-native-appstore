import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';


export default function Login(props){
    return(
        <View style={styles.login}>
            <Text>This is the Login Screen</Text>
            <Button title="Michael Button" onPress={()=>{alert("Hello Michael")}}></Button>
            <Button title="Cigi Button" onPress={()=>{alert("Hello Cigi")}}></Button>
            <Button title="Tadeo Button" onPress={()=>{alert("Hello Tadeo")}}></Button>

        </View>

    );
}

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
/*const styles = StyleSheet.create({
    login: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        height: '50%',
        alignItems: 'flex-end',
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        
      },
})*/
})