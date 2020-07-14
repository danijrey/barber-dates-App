import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import AsyncStorage from '@react-native-community/async-storage'; */
import axios from 'axios'


export default function BranchContact({ route, navigation }) {

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
      <Text>Contacto:</Text>

      {branch && (
        <View>
          <Text>{branch.branchTelephone}</Text>
        </View>
      )}
    </View>
  );

};

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
  }
});

/*   return (
    <View>
      <Text>Contáctanos</Text>
      <Button
        title="Teléfono"
        onPress={() => navigation.navigate('aquiVaLaRutaDeStackScreenName')}
      />
      <Button
        title="Whatsapp"
        onPress={() => navigation.navigate('aquiVaLaRutaDeStackScreenName')}
      />
    </View>

  );

} */