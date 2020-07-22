import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

export default function Home({ navigation }){

  const [branchs, setBranchs] = useState([]);

  const storeData = async (id) => {
    try {
      await AsyncStorage.setItem('branchId', id);
    } catch (error) {

    }
  }
  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: 'http://localhost:8080',
      url: '/branchs/all'
    })
      .then(({ data }) => setBranchs(data))
/*       .catch (error => {
        console.log(error)
      }) */
  }, []);




  return(
    <View style={styles.container}>
      <Image
        style={styles.imageLogo}
        source={{ uri: 'https://res.cloudinary.com/danijrey/image/upload/v1594865375/LogoMakr_1LcE5u_lfdylc.png' }}
      
      />
      <Text style={styles.title}>Nuestras sedes:</Text>
      <FlatList
        data={branchs}
        renderItem={({ item }) => (
          <>
          <View style={styles.containerBranchs}>
            
            <ImageBackground
            style={styles.images}
            source={{uri: item.branchImage }}
            />
            
         
            <Text style={styles.text}>{item.branchName}</Text>
          </View>
          <View>
            <Button
              style={styles.button}
              color='#765d3f'
              title="Ir"
              onPress={() => {
                storeData(item.id);
                navigation.navigate('Branch', { id: item.id }) 
                }}  //Guardar este ID en el LocalStorage!!!!! como branchId
            />
          </View>
          </>
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
    justifyContent: 'center',
  },
  containerBranchs: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#272c33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    color: '#765d3f',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    color: '#f2a951',
    alignItems: 'center',
  },
  button: {
    fontSize: 18,
    color: '#f2a951',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  body: {
    fontSize: 16
  },
  imageLogo:{
    display: 'flex',
    padding: 20,
    width: 350,
    height: 200,
  },
  images:{
    marginTop: 15,
    padding: 20,
    display: 'flex',
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

