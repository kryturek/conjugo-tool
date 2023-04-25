import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const SubmitButton = ({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Submit</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff8552',
    padding: 20,
   //  borderRadius: 5,
	 width: 200,
	 alignSelf: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SubmitButton;