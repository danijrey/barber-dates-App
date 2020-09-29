import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Linking } from 'react-native'
import axios from 'axios'



export default function BranchContact({ route, navigation, Linking }) {

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
      <Text style={styles.title}>Contacto:</Text>

      {branch && (
        <View>
          <Text style={styles.text}>{branch.branchTelephone}</Text>
          <Button
            color='#765d3f'
            title="Llamar"
            onPress={() => Linking.openURL(`tel:${branch.branchTelephone}`)}
          />
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
    fontWeight: 400,
    color: '#765d3f',
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