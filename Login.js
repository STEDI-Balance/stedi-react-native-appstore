import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Login(props) {
  const [buttonText, setButtonText] = useState('Log In');

  const handleButtonPressLuke = () => {
    setButtonText((prevButtonText) => {
      if (prevButtonText === 'Log In') {
        return 'Hello Luke!';
      } else {
        return 'Log In';
      }
    });
  };

  const handleButtonPressBob = () => {
    setButtonText((prevButtonText) => {
      if (prevButtonText === 'Log In') {
        return 'Hello Bob!';
      } else {
        return 'Log In';
      }
    });
  };

  const handleButtonPressJohn = () => {
    setButtonText((prevButtonText) => {
      if (prevButtonText === 'Log In') {
        return 'Hello John!';
      } else {
        return 'Log In';
      }
    });
  };

  return (
    <View style={styles.login}>
      <Text>This is the Login Screen</Text>
      <Button title={buttonText} onPress={handleButtonPressLuke} />
      <Button title={buttonText} onPress={handleButtonPressBob} />
      <Button title={buttonText} onPress={handleButtonPressJohn} />
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
});
