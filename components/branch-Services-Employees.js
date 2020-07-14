import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


export default function BranchServicesEmployees({ route, navigation }) {

  const [selectEmployee, setSelectEmployee] = useState([]);

  const [branchId, setBranchId] = useState('');

  const [serviceId, setServiceId] = useState('');

  useEffect(() => {

    AsyncStorage.getItem('branchId')
      .then(value => setBranchId(value))

  }, []);

  useEffect(() => {

    AsyncStorage.getItem('serviceId')
      .then(value => setServiceId(value))

  }, []);

  useEffect(() => {

    axios({
      method: 'GET',
      baseURL: 'http://localhost:8080',
      url: `/branchs/${branchId}/employees/list`//corregir Ruta - REVISAR BIEN!!!!
    })
      .then(({ data }) => setSelectEmployee(data));

  }, [branchId]);

  const storeData = async (id) => {
    try {
      await AsyncStorage.setItem('employeeId', id)
    } catch (error) {
    }
  }

  return (
    <View>
      <Text>Selecciona tu artista:</Text>
      <FlatList
        data={selectEmployee}
        renderItem={({ item }) => (
          <View>
            <ImageBackground
              style={styles.images}
              source={{ uri: item.employeeImage }}
            />
            <Text >{item.employeeName}</Text>
            <Button
              title="Seleccionar"
              onPress={() => {
                storeData(item.id);
                navigation.navigate('Login', {
                id: item.id //Guardar este id en el LocalStorage!!!! como employeeId
              })}
            }
            />
          </View>
        )}
        keyExtractor={(item) => `${item.id}`}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 16
  },
  images: {
    width: 300,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  }
});