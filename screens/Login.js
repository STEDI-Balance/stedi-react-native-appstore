import React from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>
            <Text>This is the Login Screen</Text>
            <Button title="Log In" onPress={()=>{}}></Button>
            <Button title="Levi" onPress={()=>{Alert.alert("Hello Levi")}}></Button>
            <Button title="Cody" onPress={()=>{console.log("Hello Cody")}}></Button>
            <Button title="Riley" onPress={()=>{Alert.alert("Hello Riley!!!")}}></Button>
        </View>

    );
}

const styles = StyleSheet.create({
    login: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        height: '100',
        paddingBottom: 5,
        
      },
})