import {Image, Linking, StyleSheet, View} from 'react-native';
import {useEffect} from 'react';
import React from 'react';
import RoundButton from '../components/buttons/RoundButton';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Border, Colors, Spacing} from '../assets/Stylesheet';
import Footer from '../components/Footer';
import Text from '../components/Text';
import SpotifySong from '../models/SpotifySong';

const ResultScreen = ({navigation, route}: any) => {
  const song: SpotifySong = route.params?.song;

  useEffect(() => {}, []);

  const goToIdentification = () => {
    navigation.navigate({
      name: 'Identification',
    });
  };

  const handlePlaySong = async () => {
    await Linking.openURL(song.url);
  };

  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          height: '70%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: Spacing.extraLarge,
        }}>
        <Image
          source={{uri: song.url}}
          style={styles.image}
          resizeMode={'cover'}
        />
        <Text size="xl" fontStyle="bold" style={{marginBottom: Spacing.medium}}>
          {song.title}
        </Text>
        <Text
          size="l"
          fontStyle="medium"
          style={{marginBottom: Spacing.medium}}>
          {song.artist}
        </Text>
        <RoundButton
          type={'primary'}
          size={'small'}
          onPress={handlePlaySong}
          accessibilityHint={`On press play song ${song.title} from ${song.artist}`}>
          <MIcon name={'play'} size={40} color={Colors.white} />
        </RoundButton>
      </View>
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <RoundButton
          type={'primary'}
          onPress={goToIdentification}
          accessibilityHint={'On press identify song'}>
          <MIcon name={'microphone'} size={40} color={Colors.white} />
        </RoundButton>
      </View>
      <Footer start={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    borderRadius: Border.rounded,
  },
});

export default ResultScreen;
