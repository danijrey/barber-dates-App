import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
/* import DateTimePicker from '@react-native-community/datetimepicker'; */
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
/* import { Picker } from 'react-native-woodpicker'; */
import axios from 'axios'


export default function Appointment({ route, navigation }) {
  var today = new Date();
  var cDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var cTime = today.getHours();

  const [appointments, setappointments] = useState([]);

  const [branchId, setBranchId] = useState('');

  const [serviceId, setServiceId] = useState('');

  const [employeeId, setEmployeeId] = useState('');

  const [branch, setBranch] = useState([]);

  const [service, setService] = useState([]);

  const [employee, setEmployee] = useState([]);

  const [serviceDuration, setServiceDuration] = useState('');

  const [time, setTime] = useState('');

  const [date, setDate] = useState('');


  useEffect(() => {

    AsyncStorage.getItem('branchId')
      .then(value => setBranchId(value))

  }, []);

  useEffect(() => {

    AsyncStorage.getItem('serviceId')
      .then(value => setServiceId(value))

  }, []);

  useEffect(() => {

    AsyncStorage.getItem('employeeId')
      .then(value => setEmployeeId(value))

  }, []);

  useEffect(() => {
     axios({
      method: 'GET',
      baseURL: 'http://localhost:8080',
       url: `/employees/${employeeId}`,
    })
       .then(({ data }) => setEmployee(data.employeeName));
    
  }, [employeeId]);
 
  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: 'http://localhost:8080',
      url: `/services/${serviceId}`,
    })
      .then(({ data }) => {
        setService(data.serviceName)
        setServiceDuration(data.serviceDuration)
      })

  }, [serviceId]);

  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: 'http://localhost:8080',
      url: `/branchs/${branchId}`,
    })
      .then(({ data }) => setBranch(data.branchName));

  }, [branchId]);

  console.log(employee)
  console.log(service)
  console.log(branch)
  console.log(serviceDuration)
  console.log(time)
  console.log(date)

  function SendDbAppointment() {
    const data={
      date,
      time,
      BranchId: branchId,
      ServiceId: serviceId,
      EmployeeId: employeeId
    }
    axios({
      method: 'POST',
      baseURL: 'http://localhost:8080',
      url: '/appointments/',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información de tu próxima cita</Text>
      <Text style={styles.subTitle}>Sede:</Text>
      <Text style={styles.text}>{branch}</Text>
      <Text style={styles.subTitle}>Servicio:</Text>
      <Text style={styles.text}>{service}</Text>
      <Text style={styles.subTitle}>Artista:</Text>
      <Text style={styles.text}>{employee}</Text>

      <Text style={styles.subTitle}>Selecciona el día de tu cita:</Text>
      <Picker style={styles.picker}
        /* selectedValue={setTime({ value })} */
        style={{ height: 50, width: 200 }}
        onValueChange={(dValue) =>
          setDate(dValue)
        }>
        
        <Picker.Item label={today.getDate() + 1} value={(today.getDate() + 1)} />
        <Picker.Item label={today.getDate() + 2} value={(today.getDate() + 2)} />
        <Picker.Item label={today.getDate() + 3} value={(today.getDate() + 3)} />
        <Picker.Item label={today.getDate() + 4} value={(today.getDate() + 4)} />
        <Picker.Item label={today.getDate() + 5} value={(today.getDate() + 5)} />
        <Picker.Item label={today.getDate() + 6} value={(today.getDate() + 6)} />
        <Picker.Item label={today.getDate() + 7} value={(today.getDate() + 7)} />
      
        </Picker> 
      
      <Text style={styles.subTitle}>Selecciona la Hora:</Text>
        <Picker
        style={styles.picker}
        /* selectedValue={setTime({ value })} */
        style={{ height: 50, width: 200 }}
        onValueChange={(tValue) =>
          setTime(tValue)
        }>
        <Picker.Item label="8:00 am" value="8" />
        <Picker.Item label="9:00 am" value="9" />
        <Picker.Item label="10:00 am" value="10" />
        <Picker.Item label="11:00 am" value="11" />
        <Picker.Item label="12:00 mm" value="12" />
        <Picker.Item label="1:00 pm" value="13" />
        <Picker.Item label="2:00 pm" value="14" />
        <Picker.Item label="3:00 pm" value="15" />
        <Picker.Item label="4:00 pm" value="16" />
        <Picker.Item label="5:00 pm" value="17" />
        <Picker.Item label="6:00 pm" value="18" />
        <Picker.Item label="7:00 pm" value="19" />
      </Picker>  


      <Button
        color='#765d3f'
        title="Confirmar"
        onPress={() => navigation.navigate('Confirmed',
          SendDbAppointment()
        )}
      />
    </View>

  )

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
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#765d3f',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#765d3f',
    justifyContent: 'center'
  },
  text: {
    fontSize: 17,
    marginBottom: 15,
    color: '#f2a951',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    color: '#f2a951',
    borderWidth: 1,
    backgroundColor: '#272c33',
    borderColor: 'black',
  },
  picker: {
    fontSize: 16,
    backgroundColor: '#272c33',
  }
});