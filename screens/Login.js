import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function CustomButton( props ) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.name} Button</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#1B72DF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default function Login( props ) {
  const handlePress = (name) => {
    alert(`Hello ${name}!`);
  };
  return(
      <View style={styles.container}>
          <Text>This is the Login Screen</Text>
          <CustomButton  name="Michael" onPress={()=> handlePress("Michael") }/>
          <CustomButton  name="Cigi" onPress={()=> handlePress("Cigi") }/>
          <CustomButton  name="Tadeo" onPress={()=> handlePress("Tadeo") }/>
          <CustomButton  name="Miguel" onPress={()=> handlePress("Miguel") }/>
          <CustomButton  name="Riley" onPress={()=> handlePress("Riley") }/>
      </View>

  );
}