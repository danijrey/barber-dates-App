import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Picker, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


export default function Login({ route, navigation }) {

  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');

  const Nav = () => {
    navigation.navigate('Appointment')
  }

  
  const handleSubmit = async (navigation) => {
    const data = { 
      clientEmail, 
      clientPassword,
    };

    axios({
      method: 'POST',
      baseURL: 'http://localhost:8080',
      url: '/login',
      data,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(({ data }) => {
      AsyncStorage.setItem("token", data.token)
      AsyncStorage.setItem("clientId", data.clientId)
      Nav();
    })
    

}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa a tu cuenta</Text>
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

      <Button style={styles.enviarBtn}
        color='#765d3f'
        title="Enviar"
        onPress={handleSubmit}
        
      />
      <View style={styles.registro}>
        <Text style={styles.text}>¿No tienes una cuenta aún?, Regístrate!</Text>
        <View style={styles.registroBtn}>
          <Button
            color='#765d3f'
            title="Registrarse"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: 'auto',
    backgroundColor: '#272c33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#f2a951',
    justifyContent: 'center'
  },
  text: {
    fontSize: 17,
    marginBottom: 15,
    color: '#f2a951',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    margin: 5,
    color: '#f2a951',
    borderWidth: 1,
    borderColor: 'black',
  },
  registro: {
    marginTop: 30,
    alignItems: 'center',
  },
    registroBtn: {
    width: 130,
  },
    enviarBtn: {
    width: 130,
  }
});


