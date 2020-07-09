import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import AsyncStorage from '@react-native-community/async-storage'; */
import axios from 'axios'


export default function BranchServicesEmployees({ navigation }) {

  const [selectEmployee, setSelectEmployee] = useState([]);

  useEffect(() => {
    //Hago un get del LocalStorage de idBranch
    axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/branchs/${idBranch}/employees`//corregir Ruta - REVISAR BIEN!!!!
    })
      .then(({ data }) => setSelectEmployee(data));
  }, []);

  return (
    <View>
      <Text>Selecciona tu artista:</Text>
      <FlatList
        data={selectEmployee}
        renderItem={({ item }) => (
          <View>
            <Image >{item.employeeImage}</Image>
            <Text >{item.employeeName}</Text>
            <Button
              title="Seleccionar"
              onPress={() => navigation.navigate('Login', {
                id: item.id //Guardar este id en el LocalStorage!!!! como idEmployee
              })}
            />
          </View>
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>

  );

}