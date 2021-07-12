/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {Container, HeaderButton, InputX} from '../../Components';
import useAppTheme from '../../Themes/Context';
import {IconX, ICON_TYPE} from '../../Icons';
import {useStoreState} from 'easy-peasy';
import Fonts from '../../Themes/Fonts';
import {TouchableOpacity, ListItem} from 'react-native';
import {ButtonX} from '../../Components';
import {BASE_URL} from '../../Config/index';
import AudioRecord from 'react-native-audio-record';
import AsyncStorage from '@react-native-community/async-storage';
import Tts from 'react-native-tts';
import {TextInput, Button} from 'react-native-paper';

const MainScreen = ({routes, navigation}) => {
  const {theme} = useAppTheme();
  // eslint-disable-next-line prettier/prettier
  const {username, password} = useStoreState((state) => ({
    username: state.login.username,
    password: state.login.password,
  }));

  useEffect(() => {
    getData();
    readData();
    const _toggleDrawer = () => {
      navigation.toggleDrawer();
    };
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };

    AudioRecord.init(options);
  }, [navigation, theme.colors.headerTitle]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@image_search');
      const searchData = JSON.parse(jsonValue);
      setResData(searchData);
      setListData(searchData.list);
    } catch (e) {
      console.log('ee');
      // error reading value
    }
  };
  const [resData, setResData] = useState('');
  const [resList, setListData] = useState('');
  const [dataToRead, setDataToRead] = useState('');

  const readData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@image_search');
      const searchData = JSON.parse(jsonValue);
      const n = 0;
      console.log('cis 🤫🤫💦', searchData.list);
      setDataToRead(searchData.list);
      for (let value of searchData.list) {
        // for (let value of searchData.list) {
        console.log(value.item_name); // Will log value in array
        Tts.speak(`item`, {
          androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
          },
        });
        Tts.speak(value.item_name, {
          androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
          },
        });
        Tts.speak(value.item_qty, {
          androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
          },
        });
        Tts.speak(value.item_unit, {
          androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
          },
        });
      }
    } catch (e) {
      console.log('ee');
      // error reading value
    }
  };
  const record = () => {
    console.log('record');

    AudioRecord.start();
    timeout;
    let timeout = setTimeout(() => {
      stopRecord();
      console.log('hello');
    }, 5000);
  };
  const readDataNew = () => {
    console.log('cis 🤫🤫💦', dataToRead);
    for (let value of dataToRead) {
      // for (let value of searchData.list) {
      console.log(value.item_name); // Will log value in array
      Tts.speak(`item`, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
      Tts.speak(value.item_name, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
      Tts.speak(value.item_qty, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
      Tts.speak(value.item_unit, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  };

  const stopRecord = async () => {
    console.log('recordStop ');
    const audioFile = await AudioRecord.stop();
    AudioRecord.on('data', (data) => {});
    console.log('audioFile 🍷', audioFile);
    initialRec(audioFile);
    // AudioRecord.stop();
  };
  const initialRec = (audioFile) => {
    uploadAudio(audioFile);
    console.log('initialRec', audioFile);
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };
  };
  const uploadAudio = async (fileUrl) => {
    console.log('upload');
    console.log('🧑‍🚀🧑‍🚀', fileUrl);
    let formData = new FormData();
    formData.append('audioFile', {
      uri: 'file:///data/user/0/com.easy_boiler/files/test.wav',
      type: 'audio/wav',
      name: 'test.wav',
    });
    formData.append('flag', 'name');
    console.log(formData);

    fetch(`${BASE_URL}/voicesearch/en`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response 🔥', response.flag);
        console.log(response);
      })
      .catch((err) => console.error(err));
  };
  const updateFieldChanged = (i) => (e) => {
    console.log('index: ' + i);
    console.log('property name: ' + e.target.item_qty);
    let newArr = [...resData]; // copying the old datas array
    newArr[i] = e.target.value; // replace e.target.value with whatever you want to change it to

    setResData(newArr); // ??
    console.log(resData);
  };
  const data = [{name: 'test1'}, {name: 'test2'}];
  // const data = [{name: 'test1'}, {name: 'test2'}];
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '000-000-0000'},
    {name: 'Ada Lovelace', number: '39-44-5323523'},
    {name: 'Dan Abramov', number: '12-43-234345'},
    {name: 'Mary Pppendieck', number: '39-23-6423122'},
  ]);
  return (
    <LoadingActionContainer fixed>
      <Container
        style={{
          padding: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={record}>
                <View
                  style={{
                    padding: 10,
                    marginTop: 20,
                    backgroundColor: theme.colors.primary,
                    borderRadius: 10,
                  }}>
                  <IconX name={'md-mic'} style={{color: '#fff'}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity>
                <View
                  style={{
                    padding: 10,
                    marginTop: 20,
                    backgroundColor: theme.colors.primary,
                    borderRadius: 10,
                  }}>
                  <IconX name={'md-add'} style={{color: '#fff'}} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#e1e1e1',
            }}>
            <View
              style={{
                flex: 1,
                // flexDirection: 'column',
                justifyContent: 'space-around',
                paddingLeft: 20,
              }}>
              <Text>Name</Text>
              {resData
                ? resData.list.map((item) => <Text> {item.item_name} </Text>)
                : null}
              {/* {resData ? <Text>{resData.list[0].item_name}</Text> : null} */}
            </View>
            <View
              style={{
                flex: 1,
                // flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text>QTy</Text>
              {resData
                ? resData.list.map((item, i) => (
                    <TextInput name="item_qty" value={item.item_qty} />
                  ))
                : null}
            </View>
            <View
              style={{
                flex: 1,
                // flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text>item_unit</Text>
              {resData
                ? resData.list.map((item) => <Text> {item.item_unit} </Text>)
                : null}
              {/* {names.map((name) => (
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: theme.colors.primary,
                        borderRadius: 10,
                      }}>
                      <IconX name={'md-add'} style={{color: '#fff'}} />
                    </View>
                  </TouchableOpacity>
                </View>
              ))} */}
            </View>
          </View>
          <ButtonX
            // loading={loading}
            dark={true}
            color={theme.colors.primary}
            onPress={() => readDataNew()}
            label={'Read'}
          />
          <ButtonX
            // loading={loading}
            dark={true}
            color={theme.colors.primary}
            onPress={() => navigation.navigate('ProductList')}
            label={'Save Changes'}
          />
        </View>
      </Container>
    </LoadingActionContainer>
  );
};

export default MainScreen;
