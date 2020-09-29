import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

export default function BranchHome({ route, navigation }) {

  const[branch, setBranch] = useState(null);

  useEffect(() => {
    const { id } = route.params
    axios({
      method:'GET',
      baseURL: 'http://localhost:8080',
      url:`/branchs/${id}`,
    })
      .then(({ data }) => setBranch(data));

  }, []);

  const storeData = async (id) => {
    try {
      await AsyncStorage.setItem('branchId', id);
     } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <View>
         <Image
          style={styles.imageLogo}
          source={{ uri: 'https://res.cloudinary.com/danijrey/image/upload/v1594865375/LogoMakr_1LcE5u_lfdylc.png' }}
        /> 
        
      </View>
      {branch && (
        <View style={styles.branch}>
          <Text style={styles.title} >{branch.branchName}</Text>
          <ImageBackground 
            style={styles.images}
            source={{ uri: branch.branchImage }}
            />
          <Text style={styles.text}>{branch.branchDescrption}</Text>
        </View>
      )}
      <View style={styles.buttons}>
        <View style={styles.buttonsA}>
          <View style={styles.buttonsAA}>
            <Button
              style={styles.btnA}
              color='#765d3f'
              title="Artistas"
              onPress={() => {
                navigation.navigate('Barbers', {
                  id: branch.id
                })
              } }
            />
          </View>
          <View style={styles.buttonsAB}>
            <Button
              style={styles.btnA}
              color='#765d3f'
              title="Servicios"
              onPress={() =>{
                storeData(branch.id);
                navigation.navigate('Services', { id: branch.id });
              } } //Guardar este ID en el LocalStorage!!!!! como branchId
            />
          </View>
        </View>
        <View style={styles.buttonsB}>
          <View style={styles.buttonsBA}>
            <Button
              style={styles.btnB}
              color= '#765d3f'
              title="¿Cómo llegar?"
              onPress={() => navigation.navigate('Map', {
                id: branch.id
              })}
            />
          </View>
          <View style={styles.buttonsBB}>
            <Button
              style={styles.btnB}
              color='#765d3f'
              title="Contacto"
              onPress={() => navigation.navigate('Contact', {
                id: branch.id
              })}
            />
          </View>
        </View>
      </View>
    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* flexWrap: 'wrap', */
    maxWidth: 'auto',
    backgroundColor: '#272c33',
    alignItems: 'center',
    alignContent: 'space-around',
    justifyContent: 'center',
  },
  branch:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    color: '#765d3f',
    alignItems: 'center',
    justifyContent: 'center',
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
  imageLogo: {
    width: 350,
    height: 200,
  },
  buttons: {

   
  },
  buttonsA: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
  },
  buttonsB: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
  },
  buttonsAA: {
    margin: 10,
    width: 130,
  },
  buttonsAB: {
    margin: 10,
    width: 130,
  },

  buttonsBA: {
    margin: 10,
    width: 130,
  },
  buttonsBB: {
    margin: 10,
    width: 130,
  }

});
