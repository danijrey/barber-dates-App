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
    <View style={styles.container}>
      <Text style={styles.title}>En nuestra sede te prestamos éstos servicios:</Text>
      
      {services && services.length > 0 &&  (
      <>
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <View>
              
              <Text style={styles.text}>{ item.serviceName }</Text>
              <Text style={styles.text}>{ item.serviceCost }</Text>
              <Text style={styles.text}>{ item.serviceDuration }</Text>
                  
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: 'auto',
    padding: 20,
    backgroundColor: '#272c33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#765d3f',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    color: '#f2a951',
    alignItems: 'center',
  },
  body: {
    fontSize: 16
  },
  images: {
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    /* alignItems: "flex-start", */
    flexWrap: 'wrap',
    marginTop: 10,
    alignContent: 'space-around',
  },
  btn: {
    marginTop: 10,
  }
});