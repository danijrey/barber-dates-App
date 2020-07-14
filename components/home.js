import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

export default function Home({ navigation }){

  const [branchs, setBranchs] = useState([]);

  const storeData = async (id) => {
    try {
      await AsyncStorage.setItem('branchId', id);
      console.log(id)
    } catch (error) {

    }
  }
  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: 'http://localhost:8080',
      url: '/branchs/all'
    })
      .then(({ data }) => setBranchs(data));
  }, []);




  return(
    <View style={styles.container}>
      <Text style={styles.title}>Nuestras sedes:</Text>
      <FlatList
        data={branchs}
        renderItem={({ item }) => (

          <View >
            
            <ImageBackground
            style={styles.images}
            source={{uri: item.branchImage }}
            />
            
         
            <Text style={styles.text}>{item.branchName}</Text>
            <Button
              style={styles.button}
              title="Ir"
              onPress={() => {
                storeData(item.id);
                navigation.navigate('Branch', { id: item.id }) 
              }} //Guardar este ID en el LocalStorage!!!!! como idBranch
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
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    alignItems: 'center',
  },
  button: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    fontSize: 16
  },
  images:{
    width: 400,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

/*   useEffect(() => {
    AsyncStorage.getItem('token')
      .then(value => {
        if(!value) {
          navigation.replace('Home')
        }
      })
  }, []); */
