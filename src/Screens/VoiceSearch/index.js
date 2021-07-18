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
import AudioRecord from 'react-native-audio-record';
import {BASE_URL} from '../../Config/index';
import Tts from 'react-native-tts';
import {ButtonX} from '../../Components';
const MainScreen = ({routes, navigation}) => {
  const {theme} = useAppTheme();
  // eslint-disable-next-line prettier/prettier
  const {username, password} = useStoreState((state) => ({
    username: state.login.username,
    password: state.login.password,
  }));
  const cartitems =
    '[{"_id": 15, "cart_id": 15, "item_id": 6, "item_name": "banana", "item_code": "itm_002", "item_rate": 110.0, "item_offer_price": 0.0, "item_qty": 75.0, "created_on": {"$date": 1625460553101}}]';

  useEffect(() => {
    console.log(theArray);
    console.log(JSON.parse(cartitems));
    const _toggleDrawer = () => {
      navigation.toggleDrawer();
    };
    Tts.speak(
      'Welcome to Voice Search. You can now start searching and adding items to your cart.',
      {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      },
    );
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };

    AudioRecord.init(options);

    console.log('use effect home');
  }, [navigation, theme.colors.headerTitle]);

  const [resData, setResData] = useState('');
  const [theArray, setTheArray] = useState([]);
  const record = () => {
    console.log('record');

    AudioRecord.start();
    timeout;
    let timeout = setTimeout(() => {
      stopRecord();
      console.log('hello');
    }, 12000);
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
    formData.append('userId', 3);

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

        if (response.flag == 'back') {
          navigation.navigate('language-success');
        }
        if (response.flag == 'place-order') {
          navigation.navigate('place-order', {
            response,
          });
        }
        if (response.flag == 'search-save') {
          navigation.navigate('search-save', {
            response,
          });
        }
        if (response.flag == 'check-order') {
          navigation.navigate('check-order');
        }
        if (response.flag == 'checkout') {
          Tts.speak(response.msg, {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
          navigation.navigate('language-success');
        }
        if (response.flag == 'search-success') {
          setResData(response);
          setTheArray([...theArray, response.item]);
          Tts.speak(response.msg, {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
        } else {
          Tts.speak(response.msg, {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
        }
      })
      .catch((err) => console.error(err));
  };

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
              {/* {resData && <Text>{resData.item.item_name}</Text>} */}
              {/* {resData ? <Text>{resData.item.item_name}</Text> : null} */}
              {theArray
                ? theArray.map((item) => <Text> {item.item_name} </Text>)
                : null}
            </View>
            <View
              style={{
                flex: 1,
                // flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text>QTY</Text>
              {theArray
                ? theArray.map((item) => <Text> {item.item_qty} </Text>)
                : null}
            </View>
            <View
              style={{
                flex: 1,
                // flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text>item unit</Text>
              {/* {resData ? <Text>{resData.item.item_unit}</Text> : null} */}
              {theArray
                ? theArray.map((item) => <Text> {item.item_unit} </Text>)
                : null}
            </View>
            {/* <View
              style={{
                flex: 1,
                // flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text>Action</Text>
              {names.map((name) => (
                <TouchableOpacity>
                  <View
                    style={{
                      padding: 5,
                      width: 35,
                      backgroundColor: theme.colors.primary,
                      borderRadius: 10,
                    }}>
                    <IconX name={'md-remove'} style={{color: '#fff'}} />
                  </View>
                </TouchableOpacity>
              ))}
            </View> */}
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View>
              <InputX
                label="Product Name"
                // mode="outlined"
                // ref={inputUserName}
                style={{marginTop: 10, backgroundColor: '#fafafa', width: 200}}
                autoCapitalize="none"
                returnKeyType={'next'}
                // onSubmitEditing={onSubmit}
                // onChangeText={(text) =>
                //   onChange({
                //     key: 'username',
                //     value: text,
                //   })
                // }
              />
            </View>
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
          <ButtonX
            // loading={loading}
            dark={true}
            color={theme.colors.primary}
            // onPress={() => navigation.navigate('PendingDelivery')}
            label={'Save Changes'}
          />
          <ButtonX
            // loading={loading}
            dark={true}
            color={theme.colors.primary}
            onPress={() => navigation.navigate('place-order')}
            label={'Update'}
          />
        </View>
      </Container>
    </LoadingActionContainer>
  );
};

export default MainScreen;
