import React from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>
            <View>
            <Button title="Log In" onPress={()=>{Alert.alert("Hello from Adam!");}}></Button>
            </View><View>
            <Button title="Log In #2" onPress={()=>{Alert.alert("Hello from Nathan!");}}></Button>
            </View><View>
            <Button title="Log In #3" onPress={()=>{Alert.alert("Hello from Brodie!");}}></Button>
            </View><View>
            <Button title="Ryan" onPress={()=>{Alert.prompt("Hello Ryan, please enter your password.");}}></Button>
            </View><View>
            <Button title="Log In #5" onPress={()=>{Alert.alert("Hello from Eymi!");}}></Button>
            </View>
        </View>
        

    );
}

const styles = StyleSheet.create({
    login: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'pink',
        height: '100%',
        paddingTop: 100,
        paddingBottom: 100,
      },
})
