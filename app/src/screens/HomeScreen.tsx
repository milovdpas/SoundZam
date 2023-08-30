import {View} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react';
import {Colors} from '../assets/Stylesheet';
import {Shadow} from 'react-native-shadow-2';
import Footer from '../components/Footer';
import AudioRecorder from '../components/inputs/AudioRecorder';
import {FileSelectedData} from '../models/FileSelectedData';
import Text from '../components/Text';
import MorphingCircle from '../components/animations/MorphingCircle';
import Axios from '../utils/modules/Axios';
import FormData from 'form-data';

const HomeScreen = ({navigation}: any) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('none');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'listen') {
      setTimeout(() => {
        setStatus('findMatch');
      }, 4000);
    } else if (status === 'findMatch') {
      setTimeout(() => {
        setStatus('expandSearch');
      }, 4000);
    } else if (status === 'expandSearch') {
      setTimeout(() => {
        setStatus('lastTry');
      }, 4000);
    } else if (status === 'lastTry') {
      setTimeout(() => {}, 4000);
    }
  }, [status, setStatus]);

  const detectSong = async (audio: FileSelectedData | null) => {
    if (!audio || isFetching) {
      return;
    }
    setIsFetching(true);
    const data = new FormData();
    data.append('file', audio);
    try {
      const response = await Axios.post('/recognize/detect', data);
      setIsFetching(false);
      if (!response.data.success) {
        console.error(response.data);
        return;
      }
      console.log(response.data);
      navigation.navigate({
        name: 'Results',
        params: {
          song: {
            artist: response.data.artist,
            title: response.data.title,
            image: response.data.image,
            url: response.data.url,
          },
        },
      });
    } catch (e: any) {
      setIsFetching(false);
      console.error(e.response);
      console.error(e.response.data);
      console.error(e.response.status);
    }
  };

  const onStart = () => {
    console.log('onStart');
    setIsRecording(true);
    setStatus('listen');
  };

  const onStop = () => {
    console.log('onStop');
    setIsRecording(false);
    setStatus('none');
  };

  return (
    <View style={{height: '100%'}}>
      {isRecording ? (
        <View
          style={{
            height: '70%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MorphingCircle colors={[Colors.orange, Colors.pink]} />
        </View>
      ) : (
        <View
          style={{
            height: '70%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Shadow distance={30} startColor={'rgba(224, 167, 252, 0.2)'}>
            <View
              style={{
                borderRadius: 200,
                paddingHorizontal: '30%',
                paddingVertical: '30%',
              }}
            />
          </Shadow>
        </View>
      )}
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AudioRecorder
          onAudioStart={onStart}
          onAudioStop={onStop}
          onAudioRecorded={detectSong}
          treshold={16000}
        />
      </View>
      <Footer start={false}>
        {status === 'none' ? (
          <Text size={'m'} alignment={'center'} color={Colors.lightPurple} />
        ) : status === 'listen' ? (
          <Text size={'m'} alignment={'center'} color={Colors.lightPurple}>
            Listening to music
          </Text>
        ) : status === 'findMatch' ? (
          <Text size={'m'} alignment={'center'} color={Colors.lightPurple}>
            Find a match
          </Text>
        ) : status === 'expandSearch' ? (
          <Text size={'m'} alignment={'center'} color={Colors.lightPurple}>
            Expand search
          </Text>
        ) : (
          <Text size={'m'} alignment={'center'} color={Colors.lightPurple}>
            Last try
          </Text>
        )}
      </Footer>
    </View>
  );
};

export default HomeScreen;
