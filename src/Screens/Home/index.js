/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {Container, HeaderButton} from '../../Components';
import useAppTheme from '../../Themes/Context';
import {IconX, ICON_TYPE} from '../../Icons';
import {Image} from 'react-native';
import metrics from '../../Themes/Metrics';
import {useStoreState} from 'easy-peasy';
import Fonts from '../../Themes/Fonts';
import {TouchableOpacity} from 'react-native';
import NavigationService from '../../Navigation/index';
import Routes from '../../Navigation/Routes/index';
import AudioRecord from 'react-native-audio-record';
import {BASE_URL} from '../../Config/index';

import {Section, PasswordInputX, InputX, ButtonX} from '../../Components';
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

    navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={{marginLeft: 10}}>
            <HeaderButton
              icon="menuunfold"
              color={theme.colors.headerTitle}
              iconOrigin={ICON_TYPE.ANT_ICON}
              onPress={_toggleDrawer}
            />
          </View>
        );
      },
    });
  }, [navigation, theme.colors.headerTitle]);
  // const toMenu = () => {
  //   navigation.navigate('MenuSelection')}
  //   // NavigationService.navigate(Routes.MENU_SCREEN);
  // };
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

    fetch(`${BASE_URL}/language`, {
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
        if (response.flag != 'navigation-error') {
          navigation.navigate(response.flag);
        } else {
          console.log('route error');
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
        <View style={{padding: 20, margin: 10, backgroundColor: 'white'}}>
          <Text style={{textAlign: 'center', fontSize: 18}}>Welcome</Text>
          <Text style={{textAlign: 'center', fontFamily: Fonts.type.italic}}>
            {/* {username + ' ' + password} */}
            Test User
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          {/* <Image
            source={require('../../../hero/3.png')}
            style={{
              width: metrics.screenWidth,
              aspectRatio: 1,
              resizeMode: 'contain',
            }}
          /> */}
        </View>
        <Text style={{fontSize: 20, textAlign: 'center', padding: 20}}>
          choose a language to continue
        </Text>
        <ButtonX
          // loading={loading}
          dark={true}
          color={theme.colors.primary}
          onPress={() => navigation.navigate('language-success')}
          label={'English'}
        />
        <ButtonX
          // loading={loading}
          dark={true}
          color={theme.colors.primary}
          // onPress={loginUser}
          label={'Tamil'}
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={record}>
            <View
              style={{
                padding: 10,
                marginTop: 10,
                backgroundColor: theme.colors.primary,
                borderRadius: 10,
              }}>
              <IconX name={'md-mic'} style={{color: '#fff'}} />
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    </LoadingActionContainer>
  );
};

export default MainScreen;
