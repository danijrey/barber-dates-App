import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import axios from 'axios'


export default function FinalMessage({ navigation }) {

  return (
    <View style={styles.container}>
      
      <Image
        style={styles.imageLogo}
        source={{ uri: 'https://res.cloudinary.com/danijrey/image/upload/v1594865375/LogoMakr_1LcE5u_lfdylc.png' }}

      />
      <Text style={styles.title}>¡Gracias por utilizar nuestros servicios!</Text>
    </View>

  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: 'auto',
    padding: 20,
    backgroundColor: '#272c33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
    fontWeight: 'bold',
    color: '#765d3f',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    color: '#f2a951',
    alignItems: 'center',
  },
  imageLogo: {
    display: 'flex',
    padding: 20,
    width: 350,
    height: 200,
  },
  
});