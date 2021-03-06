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
      url: `/branchs/${branchId}/employees/list`
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
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu artista:</Text>
      <FlatList
        data={selectEmployee}
        renderItem={({ item }) => (
          <View style={styles.containerEmployee}>
            <ImageBackground
              style={styles.images}
              source={{ uri: item.employeeImage }}
            />
            <Text style={styles.text}>{item.employeeName}</Text>
            <View style={styles.buttonSelect}>
              <Button
                color='#765d3f'
                title="Seleccionar"
                onPress={() => {
                  storeData(item.id);
                  navigation.navigate('Login', {
                  id: item.id //Guardar este id en el LocalStorage!!!! como employeeId
                })}
              }
              />
            </View>
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
    flexWrap: 'wrap',
    maxWidth: 'auto',
    backgroundColor: '#272c33',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  containerEmployee: {
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: 'auto',
    backgroundColor: '#272c33',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#765d3f',
    textAlign: 'center',
    justifyContent: 'center'
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 15,
    color: '#f2a951',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    color: '#f2a951',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelect:{
    width: 130,
  },
  images: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  }
});