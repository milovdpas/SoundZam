import {Dimensions, StyleSheet, View, Linking, Image} from 'react-native';
import SoundCloudSong from '../../models/SoundCloudSong';
import {Border, Colors, Spacing} from '../../assets/Stylesheet';
import React from 'react';
import Text from '../Text';
import RoundButton from '../buttons/RoundButton';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type SongCardProps = {
  song: SoundCloudSong;
};

const SongCard = ({song}: SongCardProps) => {
  const handlePlaySong = async () => {
    await Linking.openURL(`https://on.soundcloud.com/${song.songId}`);
  };

  return (
    <View
      style={[
        styles.songCard,
        {
          backgroundColor: '#421F4D',
        },
      ]}>
      <Image
        source={{uri: song.imageUrl}}
        style={styles.image}
        resizeMode={'cover'}
      />
      <View style={styles.center}>
        <Text size="m" fontStyle="bold">
          {song.name}
        </Text>
        <Text size="s" fontStyle="bold">
          {song.artist}
        </Text>
      </View>
      <View style={styles.right}>
        <RoundButton
          type={'primary'}
          size={'small'}
          onPress={handlePlaySong}
          accessibilityHint={`On press play song ${song.name} from ${song.artist}`}>
          <MIcon name={'play'} size={40} color={Colors.white} />
        </RoundButton>
      </View>
    </View>
  );
};

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  songCard: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: Border.rounded,
    marginBottom: Spacing.medium,
    justifyContent: 'space-between',
    maxWidth: '100%',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: Border.rounded,
    borderBottomLeftRadius: Border.rounded,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: Spacing.small,
    width: dimensions.width - 192.72727272727275,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.small,
    paddingRight: Spacing.small,
  },
});

export default SongCard;
