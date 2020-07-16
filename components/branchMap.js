import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


export default function BranchMap({ route, navigation }) {

  const [branch, setBranch] = useState(null);

  useEffect(() => {
    const { id } = route.params
    axios({
      method: 'GET',
      baseURL: 'http://localhost:8080',
      url: `/branchs/${id}`,
    })
      .then(({ data }) => setBranch(data));

  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubicación:</Text>

      {branch && (
        <View>
          <Text style={styles.text}>{branch.branchAdress}</Text>
        </View>
      )}
    </View>
  );

};

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
    color: '#f2a951',
    justifyContent: 'center'
  },
  text: {
    fontSize: 17,
    marginBottom: 15,
    color: '#f2a951',
    alignItems: 'center',
  },
  body: {
    fontSize: 16
  }
});

