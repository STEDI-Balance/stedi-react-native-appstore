import React from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>

            <Text>Hello Brent</Text>
            <Button title="brentButton" onPress={()=>Alert.alert("Hello Brent")}></Button>

            <Text>Hello Jordan</Text>
            <Button title="jordanButton" onPress={()=>Alert.alert("Hello Jordan")}></Button>
        
            <Text>Hello Joshua</Text>
            <Button title="joshuaButton" onPress={()=>Alert.alert("Hello Joshua")}></Button>

            <Text>Hello Austin</Text>
            <Button title="austinButton" onPress={()=>Alert.alert("Hello Austin")}></Button>

        </View>
    )
    
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