/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {Container, HeaderButton} from '../../Components';
import useAppTheme from '../../Themes/Context';
import {IconX, ICON_TYPE} from '../../Icons';
import {useStoreState} from 'easy-peasy';
import Fonts from '../../Themes/Fonts';
import {TouchableOpacity} from 'react-native';
import {ButtonX} from '../../Components';
import AudioRecord from 'react-native-audio-record';
import {BASE_URL} from '../../Config/index';

const MainScreen = ({routes, navigation}) => {
  const {theme} = useAppTheme();
  // eslint-disable-next-line prettier/prettier
  const {username, password} = useStoreState((state) => ({
    username: state.login.username,
    password: state.login.password,
  }));

  useEffect(() => {
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

    console.log('use effect home');
  }, [navigation, theme.colors.headerTitle]);

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
    console.log('audioFile latees 🍷🍷', audioFile);
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

    fetch(`${BASE_URL}/navigation/en`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      // .then((response) => response.json())
      .then((response) => {
        console.log('response 🤡🤡');
        console.log('response 🍆🍆', response.flag);
        console.log(response);
        if (!response.flag === 'navigation-error') {
          navigation.navigate(response.flag);
        } else {
          console.log('route error');
        }

        // console.log(JSON.stringify(response));
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
          <Text style={{fontSize: 20, textAlign: 'center', padding: 10}}>
            Welcome to LightNow Assistant
          </Text>
          <ButtonX
            // loading={loading}
            dark={true}
            color={theme.colors.primary}
            onPress={() => navigation.navigate('list-offer-success')}
            label={'OFFERS AND COUPONS'}
          />
          <ButtonX
            // loading={loading}
            dark={true}
            color={theme.colors.primary}
            onPress={() => navigation.navigate('list-offer-success')}
            // onPress={OFFERSANDCOUPONS}
            label={'OFFERS NEAR ME'}
          />
          <ButtonX
            // loading={loading}
            dark={true}
            color={theme.colors.primary}
            // onPress={OrderDetails}
            onPress={() => navigation.navigate('order')}
            label={'Order Details'}
          />
          <ButtonX
            // loading={loading}
            dark={true}
            color={theme.colors.primary}
            onPress={() => navigation.navigate('profile')}
            // onPress={profilestackscreen}
            label={'My Profile'}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity>
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
        </View>
      </Container>
    </LoadingActionContainer>
  );
};

export default MainScreen;
