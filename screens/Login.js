import React from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>
            <Text>This is the Login Screen</Text>
            <Button title="Log In" onPress={()=>{Alert.alert("Hello Arianne")}}></Button>
            <Button title="Log In" onPress={()=>{Alert.alert("Hello Bam")}}></Button>
            <Button title="Log In" onPress={()=>{Alert.alert("Hello Izak")}}></Button>
            <Button title="Log In" onPress={()=>{Alert.alert("Hello Eric")}}></Button>
            <Button title="Log In" onPress={()=>{Alert.alert("Hello Nate")}}></Button>
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
