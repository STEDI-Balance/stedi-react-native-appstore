import React from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>
            <Text>This is the Login Screen</Text>
            <Button title="Levi" onPress={()=>{Alert.alert("Hello Levi")}}></Button>
            <Button title="Cody" onPress={()=>{Alert.alert("Hello Cody")}}></Button>
            <Button title="Riley" onPress={()=>{Alert.alert("Hello Riley!!!")}}></Button>
            <Button title="Mayson" onPress={()=>{Alert.alert("Hello Mayson!!")}}></Button>
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