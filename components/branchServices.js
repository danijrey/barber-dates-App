import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import AsyncStorage from '@react-native-community/async-storage'; */
import axios from 'axios'


export default function BranchServices({ navigation }) {

  const [services, setServices] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/branchs/${id}/services/all`//corregir Ruta
    })
      .then(({ data }) => setServices(data));
  }, []);

  return (
    <View>
      <Text>En nuestra sede te prestamos éstos servicios:</Text>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <View>
            <Text >{item.serviceName}</Text>
            <Text >{item.serviceCost}</Text>
            <Text >{item.serviceDuration}</Text>
            <Button
              title="Seleccionar"
              onPress={() => navigation.navigate('Select', {
                id: item.id
              })} //Guardar este Id en el LocalStotage!!! como idService
            />
          </View>
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}