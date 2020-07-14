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
      <Text>Te presentamos nuestros artistas:</Text>
      <FlatList
        data={employees}
        renderItem={({ item }) => (
          <View>
            <ImageBackground 
              style={styles.images}
              source={{ uri: item.employeeImage }}
            />
            <Text >{item.employeeName}</Text>
            <Text >{item.employeeDescription}</Text>
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
    fontWeight: 'bold'
  },
  body: {
    fontSize: 16
  },
  images: {
    width: 300,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  }
});