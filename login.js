import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>
            <Text>Button moment</Text>
            <Button title="Hi Dallen" onPress={()=>{}}></Button>
            <Button title="Hi Jacob" onPress={()=>{}}></Button>
            <Button title="Hi Jared" onPress={()=>{}}></Button>
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