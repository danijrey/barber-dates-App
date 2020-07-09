import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import AsyncStorage from '@react-native-community/async-storage'; */
import axios from 'axios'


export default function BranchEmployees({ navigation }) {


  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/branchs/${id}/employees/all`//corregir Ruta
    })
      .then(({ data }) => setEmployees(data));
  }, []);

  return (
    <View>
      <Text>Te presentamos nuestros artistas:</Text>
      <FlatList
        data={employees}
        renderItem={({ item }) => (
          <View>
            <Image >{item.employeeImage}</Image>
            <Text >{item.employeeName}</Text>
            <Text >{item.employeeDescription}</Text>
          </View>
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>

  );

}