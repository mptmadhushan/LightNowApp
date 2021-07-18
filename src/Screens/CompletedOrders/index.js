/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {Container, HeaderButton} from '../../Components';
import useAppTheme from '../../Themes/Context';
import {IconX, ICON_TYPE} from '../../Icons';
import {useStoreState} from 'easy-peasy';
import Fonts from '../../Themes/Fonts';
import {TouchableOpacity} from 'react-native';
import {ButtonX} from '../../Components';
import metrics from '../../Themes/Metrics';
import {Image} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import {BASE_URL} from '../../Config/index';
import Tts from 'react-native-tts';

const MainScreen = ({routes, route, navigation}) => {
  const {theme} = useAppTheme();
  // eslint-disable-next-line prettier/prettier
  const {response} = route.params;
  const [resList, setListData] = useState('');

  useEffect(() => {
    console.log('🌙🌙', response);
    Tts.speak(response.msg, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
    const newData = JSON.parse(response.orders);
    setListData(newData);

    for (let value of newData) {
      Tts.speak(`address${value.address}`, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
    console.log('use effect completed order');
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };

    AudioRecord.init(options);

    console.log('use effect home');
  }, []);

  const record = () => {
    console.log('record');

    AudioRecord.start();
    timeout;
    let timeout = setTimeout(() => {
      stopRecord();
      console.log('hello');
    }, 5000);
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
        if (response.flag == 'back') {
          Tts.speak(response.msg, {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
          navigation.navigate('order-menu');
        }
        if (!response.flag === 'navigation-error') {
          navigation.navigate(response.flag);
        } else {
          console.log('route error');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <LoadingActionContainer fixed>
      <SafeAreaView
        style={{
          padding: 10,
        }}>
        <ScrollView>
          <View
            style={{
              marginTop: 10,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                backgroundColor: '#e1e1e1e1',
                width: metrics.screenWidth * 0.95,
                height: metrics.screenHeight / 2,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    width: '30%',
                  }}>
                  <Image
                    source={require('../../../hero/3.png')}
                    style={{
                      width: metrics.screenWidth / 5,
                      height: metrics.screenHeight / 7,
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '60%',
                  }}>
                  {resList ? (
                    <Text
                      style={{fontSize: 14, textAlign: 'center', padding: 10}}>
                      Address :{resList[0].address}
                    </Text>
                  ) : null}
                  {resList ? (
                    <Text
                      style={{fontSize: 14, textAlign: 'center', padding: 10}}>
                      coupon value :{resList[0].coupon_value}
                    </Text>
                  ) : null}
                </View>
              </View>

              <ButtonX
                dark={true}
                color={theme.colors.primary}
                label={'View'}
              />
            </View>
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
        </ScrollView>
      </SafeAreaView>
    </LoadingActionContainer>
  );
};

export default MainScreen;
