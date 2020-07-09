import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import AsyncStorage from '@react-native-community/async-storage'; */
import axios from 'axios'

export default function BranchHome({ route, navigation }) {

  const[branch, setBranch] = useState(null);

  useEffect(() => {
    const { id } = route.params
    axios({
      method:'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url:`/branchs/${id}`,
    })
      .then(({ data }) => setBranch(data))
  }, []);



  return (
    <View>
      <Text>Sede:</Text>

      {branch && (
        <View>
          <Text>{branch.branchName}</Text>
          <Image>{branch.branchImage}</Image>
          <Text>{branch.branchDescrption}</Text>
        </View>
      )}
      <Button
        title="Conocer Barberos"
        onPress={() => navigation.navigate('Barbers', {
          id: item.id
        })}
      />
      <Button
        title="Servicios"
        onPress={() => navigation.navigate('Services', {
          id: item.id
        })} //Guardar este ID en el LocalStorage!!!!! como idBranch
      />
      <Button
        title="¿Cómo llegar?"
        onPress={() => navigation.navigate('Map', {
          id: item.id
        })}
      />
      <Button
        title="Contacto"
        onPress={() => navigation.navigate('Contact', {
          id: item.id
        })}
      />
    </View>

  );

}