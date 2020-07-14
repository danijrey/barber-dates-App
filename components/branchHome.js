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
      <Text>Sede:</Text>

      {branch && (
        <View>
          <Text>{branch.branchName}</Text>
          <ImageBackground 
            style={styles.images}
            source={{ uri: branch.branchImage }}
            />
          <Text>{branch.branchDescrption}</Text>
        </View>
      )}
      <Button
        title="Conocer Barberos"
        onPress={() => {
          navigation.navigate('Barbers', {
            id: branch.id
          })
        } }
      />
      <Button
        title="Servicios"
        onPress={() =>{
          storeData(branch.id);
          navigation.navigate('Services', { id: branch.id });
        } } //Guardar este ID en el LocalStorage!!!!! como idBranch
      />
      <Button
        title="¿Cómo llegar?"
        onPress={() => navigation.navigate('Map', {
          id: branch.id
        })}
      />
      <Button
        title="Contacto"
        onPress={() => navigation.navigate('Contact', {
          id: branch.id
        })}
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
    width: 400,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  }
});