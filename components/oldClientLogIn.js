import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Picker, Button } from 'react-native';
import axios from 'axios';


export default function Login() {

  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');

  function handleSubmit() {
    const data = { 
      clientEmail, 
      clientPassword,
    };

    axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/login',
      data,
    })
  }

/*   useEffect(() => {
  AsyncStorage.getItem('token')
    .then(value => {
      if(!value) {
        navigation.replace('Home')
      }
    })
}, []); */

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu e-mail"
        onChangeText={text => setClientEmail(text)}
        defaultValue={clientEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        onChangeText={text => setClientPassword(text)}
        secureTextEntry={true}
        defaultValue={clientPassword}
      />

      <Button
        title="Enviar"
        onPress={handleSubmit}
        
      />
      <Text>¿No Tienes una cuenta aún?, Regístrate!</Text>
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
  }
});
