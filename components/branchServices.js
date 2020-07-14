import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


export default function BranchServices({ navigation }) {

  const [services, setServices] = useState([]);

  const [branchId, setBranchId] = useState('');

  useEffect(() => {

    AsyncStorage.getItem('branchId')
      .then(value => setBranchId(value))

  }, []);
 

  useEffect(() => {


    axios({
      method: 'GET',
      baseURL: "http://localhost:8080",
      url: `/branchs/${branchId}/services/list`
    })
      .then(({ data }) => setServices(data[0].Services));
      console.log(services);

  }, [branchId]);


  const storeData = async (id) => {
    try {
      await AsyncStorage.setItem('serviceId', id)
      console.log(id)
    } catch (error) {
    }
  }
  console.log(services)
  return (
    <View>
      <Text>En nuestra sede te prestamos éstos servicios:</Text>
      
      {services && services.length > 0 &&  (
      <>
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <View>
              
                  <Text >{ item.serviceName }</Text>
                  <Text >{ item.serviceCost }</Text>
                  <Text >{ item.serviceDuration }</Text>
                  
                  <Button
                    title="Seleccionar"
                    onPress={() => {
                      storeData(item.id);
                      navigation.navigate('Select', { id: item.id });
                    }}//Guardar este Id en el LocalStotage!!! como serviceId
                />
              
            </View>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </>
      )}
      
    </View>
  );
}

/* const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('branchId');
    console.log(value);
    return (value);
  } catch (error) {
    // error reading value
  }

} 



*/