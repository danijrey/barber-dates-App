import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


export default function Appointment({ route, navigation }) {

  const [appointments, setappointments] = useState([]);

  const [branchId, setBranchId] = useState('');

  const [serviceId, setServiceId] = useState('');

  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {

    AsyncStorage.getItem('branchId')
      .then(value => setBranchId(value))

  }, []);

  useEffect(() => {

    AsyncStorage.getItem('serviceId')
      .then(value => setServiceId(value))

  }, []);

  useEffect(() => {

    AsyncStorage.getItem('employeeId')
      .then(value => setEmployeeId(value))

  }, []);


  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: 'http://localhost:8080',
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