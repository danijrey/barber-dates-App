import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
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
      console.log(id)
    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sede:</Text>

      {branch && (
        <View>
          <Text style={styles.text} >{branch.branchName}</Text>
          <ImageBackground 
            style={styles.images}
            source={{ uri: branch.branchImage }}
            />
          <Text style={styles.text}>{branch.branchDescrption}</Text>
        </View>
      )}
      <View style={styles.buttons}>
      <Button
        style={styles.btn}
        title="Conocer Barberos"
        onPress={() => {
          navigation.navigate('Barbers', {
            id: branch.id
          })
        } }
      />
      <Button
        style={styles.btn}
        title="Servicios"
        onPress={() =>{
          storeData(branch.id);
          navigation.navigate('Services', { id: branch.id });
        } } //Guardar este ID en el LocalStorage!!!!! como idBranch
      />
      <Button
        style={styles.btn}
        title="¿Cómo llegar?"
        onPress={() => navigation.navigate('Map', {
          id: branch.id
        })}
      />
      <Button
        style={styles.btn}
        title="Contacto"
        onPress={() => navigation.navigate('Contact', {
          id: branch.id
        })}
      />
      </View>
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
  btn:{
    marginTop: 10,
  }
});