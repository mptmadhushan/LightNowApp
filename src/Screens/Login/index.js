/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect} from 'react';
import {Text, Keyboard, Platform} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {STATUS} from '../../Constants';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {IconX, ICON_TYPE} from '../../Icons';
import AudioRecord from 'react-native-audio-record';
import {BASE_URL} from '../../Config/index';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
var RNFS = require('react-native-fs');
import {
  Section,
  Container,
  PasswordInputX,
  InputX,
  ButtonX,
} from '../../Components';
import {Buffer} from 'buffer';
import useAppTheme from '../../Themes/Context';
import useAuth from '../../Services/Auth';
import {showInfoToast} from '../../Lib/Toast';
import BottomPanel from '../../Components/Panel';
import useTranslation from '../../i18n';
import Fonts from '../../Themes/Fonts';
import RNFetchBlob from 'rn-fetch-blob';
import SoundRecorder from 'react-native-sound-recorder';

export default ({navigation}) => {
  useEffect(() => {
    console.log('running');
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };

    AudioRecord.init(options);
  }, []);
  const onChange = useStoreActions(
    (actions) => actions.login.onLoginInputChange,
  );
  const {t} = useTranslation();
  const {login} = useAuth();
  const {theme} = useAppTheme();

  const inputUserName = useRef();
  const inputPassword = useRef();

  const panelRef = useRef();

  const onSubmit = () => {
    inputPassword.current.focus();
  };

  const {username, password, status} = useStoreState((state) => ({
    username: 'state.login.username',
    password: 'state.login.password',
    status: state.login.status,
  }));

  const loginUser = () => {
    Keyboard.dismiss();

    if (!username || !password) {
      showInfoToast('Username and password are mandatory, try again !');
    }

    login({
      username,
      password,
    });
  };
  const record = () => {
    console.log('record');

    AudioRecord.start();
  };
  const initialRec = (audioFile) => {
    uploadVideo(audioFile);
    // postData2(audioFile);
    console.log('initialRec', audioFile);
    let dirs = RNFetchBlob.fs.dirs;
    // console.log('dir 🛀🛀🛀', dirs);
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };
  };
  const stopRecord = async () => {
    console.log('recordStop ');
    const audioFile = await AudioRecord.stop();
    AudioRecord.on('data', (data) => {
      // const chunk = Buffer.from(data, 'base64');
      // console.log('chunk', chunk);
    });
    console.log('audioFile latees 🍷🍷', audioFile);
    initialRec(audioFile);
    // AudioRecord.stop();
  };

  const uploadVideo = async (fileUrl) => {
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

    fetch(`${BASE_URL}/register`, {
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
        console.log(response);
        login({
          username,
          password,
        });
        // console.log(JSON.stringify(response));
      })
      .catch((err) => console.error(err));
  };

  const loading = status === STATUS.FETCHING;

  return (
    <Container>
      <LoadingActionContainer>
        <Section>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              color: theme.colors.primary,
              marginTop: 60,
              fontFamily: Fonts.type.stylish,
              marginBottom: 20,
            }}>
            {'Light Now Assistant'}
          </Text>
        </Section>
        <Section>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontFamily: Fonts.type.italic,
              color: theme.colors.primaryText,
            }}>
            Provide any details to continue
          </Text>
        </Section>
        <Section>
          <InputX
            label="USER NAME"
            // mode="outlined"
            ref={inputUserName}
            style={{backgroundColor: '#fafafa'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            onSubmitEditing={onSubmit}
            onChangeText={(text) =>
              onChange({
                key: 'username',
                value: text,
              })
            }
            value={username}
          />
          <PasswordInputX
            ref={inputPassword}
            value={password}
            // mode="outlined"
            style={{backgroundColor: '#fafafa'}}
            label="PASSWORD"
            returnKeyType={'go'}
            onSubmitEditing={loginUser}
            onChangeText={(text) =>
              onChange({
                key: 'password',
                value: text,
              })
            }
          />
        </Section>
        <Section>
          <View style={{alignItems: 'center'}}>
            {/* <TouchableOpacity onPress={uploadVideo}> */}
            <TouchableOpacity onPress={record}>
              <View
                style={{
                  padding: 10,
                  marginTop: 10,
                  backgroundColor: theme.colors.secondary,
                  borderRadius: 10,
                }}>
                <IconX name={'md-mic'} style={{color: '#ff3f'}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={stopRecord}>
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
          <ButtonX
            loading={loading}
            dark={true}
            color={loading ? theme.colors.accent : theme.colors.primary}
            onPress={loginUser}
            label={t('login')}
          />

          <ButtonX
            mode={'text'}
            onPress={() => panelRef.current.show()}
            label=" NEED HELP "
          />
        </Section>
      </LoadingActionContainer>

      <BottomPanel ref={panelRef} />
    </Container>
  );
};
