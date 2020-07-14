import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Picker, Button } from 'react-native';
import axios from 'axios';


export default function SignUp({ route, navigation }) {
  
  const [clientName, setClientName] = useState('');
  const [clientLastname, setClientLastname] = useState('');
  const [clientTelephone, setClientTelephone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');
 

  function handleSubmit() {
    const data = { 
      clientName, 
      clientLastname, 
      clientTelephone, 
      clientEmail, 
      clientPassword
      };

    axios({
      method: 'POST',
      baseURL: 'http://localhost:8080',
      url: '/clients/create',
      data,
    }).then(
      //Redireccionar a 'Appointment'
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre"
        onChangeText={text => setClientName(text)}
        defaultValue={clientName}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu apellido"
        onChangeText={text => setClientLastname(text)}
        defaultValue={clientLastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu número de celular"
        onChangeText={text => setClientTelephone(text)}
        defaultValue={clientTelephone}
      />
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
