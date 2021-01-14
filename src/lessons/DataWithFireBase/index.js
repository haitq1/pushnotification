import React from 'react';
import database from '@react-native-firebase/database';
import {TextInput, View, Text, Button} from 'react-native';

const reference = database().ref('/users/123');
const ImportData = () => {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [data, setData] = React.useState();
  const [id, setId] = React.useState(0);
  const [stop, setStop] = React.useState(false);

  let arr = [];
  const onRead = () => {
    database()
      .ref('/users/123/')
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());
        arr = snapshot.val();
      });
  };
  const onLog = () => {
    console.log('Array length ', arr.length);
  };
  const onWrite = () => {
    database()
      .ref('/users/123/' + arr.length)
      .set({
        id: arr.length,
        name: name,
        age: age,
      })
      .then(() => console.log('Data set.'));
    setName(''), setAge('');
  };
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <TextInput
        placeholder="Input text here"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="Input number here"
        onChangeText={(text) => setAge(text)}
        value={age}
      />
      <Text>Hello how are you</Text>
      <Button title={'Click me to write'} onPress={onWrite} />
      <Button title={'Click me to read'} onPress={onRead} />
      <Button title={'Click me to log'} onPress={onLog} />
      <Text>{data}</Text>
    </View>
  );
};
export default ImportData;
