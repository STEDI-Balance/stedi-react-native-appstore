import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function Login(props) {
  return (
    <View style={styles.login}>
      <Text>This is the Login Screen</Text>
      <Button
        title="Log In"
        onPress={() => {
          console.log("Hello Brent");
        }}
      ></Button>
      <Button
        title="Log In"
        onPress={() => {
          console.log("Hello McKay");
        }}
      ></Button>
      <Button title="Log In"
        onPress={() => {
          console.log('Hello Alberto')
        }}
      ></Button>
      <Button title="Log In"
        onPress={() => {
          console.log('Hello Max')
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "green",
    height: "12%",
    alignItems: "flex-end",
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
