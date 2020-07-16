import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


export default function BranchEmployees({ navigation }) {

  const [employees, setEmployees] = useState([]);
  const [branchId, setBranchId] = useState('');

  useEffect(()=>{

      AsyncStorage.getItem('branchId')
      .then(value => setBranchId(value))
      
  }, [branchId]);
   console.log(branchId);

/*    const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('branchId');
      console.log(value);
      return (value);
    } catch (error) {
      // error reading value
    }
  }  */

  

useEffect(() => {

   /* const branchId = getData(); */
    console.log(branchId);
    axios({
      method: 'GET',
      baseURL: 'http://localhost:8080',
      url: `/branchs/${ branchId }/employees/list`
    })
      .then(({ data }) => setEmployees(data));
}, [branchId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Te presentamos nuestros artistas:</Text>
      <FlatList
        data={employees}
        renderItem={({ item }) => (
          <View style={styles.artist}>

            <ImageBackground 
              style={styles.images}
              source={{ uri: item.employeeImage }}
            />
            <Text style={styles.subTitle}>{item.employeeName}</Text>
            <View style={styles.description}>
              <Text style={styles.text}>{item.employeeDescription}</Text>
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
  artist: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  description: {
    backgroundColor: '#765d3f',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#765d3f',
    justifyContent: 'center'
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 15,
    color: '#f2a951',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    marginBottom: 15,
    color: '#272c33',
    alignItems: 'center',
  },
  body: {
    fontSize: 16
  },
  images: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  }
});