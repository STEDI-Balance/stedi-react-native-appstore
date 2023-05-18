import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>
            <Text>Hello Garret</Text>
            <Button title="Log In" onPress={()=>{}}></Button>

            <Text>Hello Americo Kutomi</Text>
            <Button title="Log In" onPress={()=>{}}></Button>

            <Text>Hello Harrison</Text>
            <Button title="Log In" onPress={()=>{}}></Button>

            <Text>Hello Clark</Text>
            <Button title="Log In" onPress={()=>{}}></Button>
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