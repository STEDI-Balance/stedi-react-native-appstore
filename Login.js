import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>
            <Text>This is the Login Screen</Text>
            <Button title="Log In" onPress={()=>{}}></Button>
            <Button title="Josh Dalton" onPress={()=>{
                alert("Hello Josh Dalton!");
            }}></Button>
            <Button title="CODY THOMAS" onPress={()=>{
                alert("HI CODY!");
            }}></Button>
            <Button title="Matt Shank" onPress={()=>{
                alert("Hello Matt Shank");
            }}></Button>
            <Button title="Walter Taylor" onPress={()=>{
                alert("Hello Walter Taylor");
            }}></Button>
        </View>

    );
}



const styles = StyleSheet.create({
    login: {
        flexDirection: 'wrap',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        height: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        
      },
})

