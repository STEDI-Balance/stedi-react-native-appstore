import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>
            <Text>This is the login screen</Text>
            <Button title="Log In" onPress={()=>{
                Alert.alert("Hello Garret");
            }}></Button>

            <Button title="Log In" onPress={()=>{
                Alert.alert("Hello Americo");
            }}></Button>

            <Button title="Log In" onPress={()=>{
                Alert.alert("Hello Harrison");
            }}></Button>

            <Button title="Log In" onPress={()=>{
                Alert.alert("Hello Clark");
            }}></Button>
           
            <Button title="Log In" onPress={()=>{
                Alert.alert("Hello Cameron");
            }}></Button>
            
        </View>

    );
}

const styles = StyleSheet.create({
    login: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        height: '12%',
        alignItems: 'flex-end',
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        
      },
})