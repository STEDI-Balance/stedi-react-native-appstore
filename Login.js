import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>
            <Text>This is the Login Screen</Text>
            <Button title="Log In" onPress={()=>{}}></Button>
            <Button title="Levi" onPress={()=>{console.log("Hello Levi")}}></Button>
            <Button title="Cody" onPress={()=>{console.log("Hello Cody")}}></Button>
            <Button title="Riley" onPress={()=>{console.log("Hello Riley!!!")}}></Button>
            <Button title="Diego" onPress={()=>{console.log("Hello Diego!!!")}}></Button>
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