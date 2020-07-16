import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
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
      <View>
        <Image
          style={styles.imageDeco}
          source={{ uri: 'https://res.cloudinary.com/danijrey/image/upload/v1594923438/LogoMakr_9u9qDe_jmdblh.png' }}
        />

      </View>
      <Text style={styles.title}>En nuestra sede te prestamos éstos servicios:</Text>
      
      {services && services.length > 0 &&  (
      <>
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <View>
              <View style={styles.containerInfo}>
                <Text></Text>
                <Text style={styles.subTitle}>{ item.serviceName }</Text>
                <Text>Costo:</Text>
                <Text style={styles.text}>{ item.serviceCost }</Text>
                <Text>Duración</Text>
                <Text style={styles.text}>{ item.serviceDuration }</Text>
              </View> 
                  <Button
                    color='#765d3f'
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
  containerInfo: {
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: 'auto',
    margin: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f2a951',
    opacity: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageDeco: {
    width: 400,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#765d3f',
    justifyContent: 'center'
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#272c33',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    color: '#272c33',
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