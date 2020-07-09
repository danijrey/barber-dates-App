import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import AsyncStorage from '@react-native-community/async-storage'; */
import axios from 'axios'


export default function Appointment({ navigation }) {

  //LEEER TODOS LOS ID DEL LOCALSTORAGE:
  // idBranch
  // idService
  // idEmployee


  const [appointments, setappointments] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/branchs/all'
    })
      .then(({ data }) => setBranchs(data));
  }, []);

/*   useEffect(() => {
    AsyncStorage.getItem('token')
      .then(value => {
        if(!value) {
          navigation.replace('Home')
        }
      })
  }, []); */


  return (
    <View>
      <Text>Nuestras sedes:</Text>
      <FlatList
        data={branchs}
        renderItem={({ item }) => (
          <View>
            <Text >{item.branchName}</Text>
            <Image >{item.branchImage}</Image>
            <Button
              title="Ir"
              onPress={() => navigation.navigate('Branch', {
                id: item.id
              })}
            />
          </View>
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>

  );

}