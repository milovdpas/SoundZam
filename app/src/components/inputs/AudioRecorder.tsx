import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import RNFS from 'react-native-fs';

import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../assets/Stylesheet';
import RoundButton from '../buttons/RoundButton';
import {FileSelectedData} from '../../models/FileSelectedData';

const DEFAULT_RECORDED_FILE_NAME_IOS = 'sound.m4a';
const DEFAULT_RECORDED_FILE_NAME_ANDROID = 'sound.mp3';
let audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(2);

const path = Platform.select({
  ios: 'audio.m4a',
  android: `${RNFS.CachesDirectoryPath}/audio.mp3`,
});

type AudioRecorderProps = {
  onAudioStart: () => void;
  onAudioStop: () => void;
  onAudioRecorded: (audio: FileSelectedData | null) => void;
  treshold: number;
};

const AudioRecorder = ({
  onAudioStart,
  onAudioStop,
  onAudioRecorded,
  treshold,
}: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [sendRecording, setSendRecording] = React.useState(true);
  const [recordUri, setRecordUri] = React.useState('');

  const getAudioData = useCallback((): FileSelectedData => {
    const type = Platform.OS === 'android' ? 'mp3' : 'm4a';
    const name =
      Platform.OS === 'android'
        ? DEFAULT_RECORDED_FILE_NAME_ANDROID
        : DEFAULT_RECORDED_FILE_NAME_IOS;

    return {
      uri: recordUri,
      type: 'audio/' + type,
      name: name,
    };
  }, [recordUri]);

  const onStopRecord = useCallback(async () => {
    Vibration.vibrate();
    await audioRecorderPlayer.stopRecorder();
  }, []);

  const removeRecord = useCallback(() => {
    setRecordUri('');

    onAudioRecorded(null);
  }, [onAudioRecorded]);

  const onStartRecord = useCallback(async () => {
    Vibration.vibrate();
    removeRecord();
    //check android
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    setRecordUri(await audioRecorderPlayer.startRecorder(path, audioSet));
  }, [removeRecord]);

  useEffect(() => {
    if (!isRecording || !recordUri || !sendRecording) {
      return;
    }
    setSendRecording(false);
    setTimeout(async () => {
      if (!isRecording || !recordUri) {
        return;
      }
      console.log('here');
      await onStopRecord();
      onAudioRecorded(getAudioData());
      await onStartRecord();
      setSendRecording(true);
    }, 4000);
  }, [
    getAudioData,
    isRecording,
    onAudioRecorded,
    onStartRecord,
    onStopRecord,
    recordUri,
    sendRecording,
  ]);

  const onRealStartRecord = async () => {
    setIsRecording(true);
    await onStartRecord();
    onAudioStart();
    setTimeout(() => {
      setIsRecording(false);
      onAudioStop();
    }, treshold);
  };

  const onRealStopRecord = async () => {
    setIsRecording(false);
    await onStopRecord();
    onAudioStop();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {isRecording ? (
            <RoundButton
              type={'secondary'}
              onPress={onRealStopRecord}
              accessibilityHint={'On press identify song'}>
              <MIcon name={'square'} size={40} color={Colors.white} />
            </RoundButton>
          ) : (
            <RoundButton
              type={'primary'}
              onPress={onRealStartRecord}
              accessibilityHint={'On press identify song'}>
              <MIcon name={'microphone'} size={40} color={Colors.white} />
            </RoundButton>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
export default AudioRecorder;
