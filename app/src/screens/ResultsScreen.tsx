import {FlatList, View} from 'react-native';
import {useEffect} from 'react';
import React from 'react';
import RoundButton from '../components/buttons/RoundButton';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Spacing} from '../assets/Stylesheet';
import Footer from '../components/Footer';
import Song from '../models/Song';
import SongCard from '../components/cards/SongCard';
import Text from '../components/Text';

const ResultsScreen = ({navigation}: any) => {
  const songs: Song[] = [
    new Song(
      'CCRAX',
      'Prada - Cassö Edit',
      'cassö',
      'https://i1.sndcdn.com/artworks-OwkI9maTTkoZYDUD-mWgSzQ-t500x500.jpg',
    ),
    new Song(
      'qM6ht',
      '(It Goes Like) Nanana',
      'Peggy Gou',
      'https://i1.sndcdn.com/artworks-J9Va6Szvss63-0-t500x500.png',
    ),
    new Song(
      'sSU37',
      'Where Have You Been',
      'Dimitri K',
      'https://i1.sndcdn.com/artworks-fO5SHom8Bx5HTafD-R0kcyQ-t500x500.jpg',
    ),
  ];
  useEffect(() => {}, []);

  const goToIdentification = () => {
    navigation.navigate({
      name: 'Identification',
    });
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
        <Text size="xl" fontStyle="bold" style={{marginBottom: Spacing.medium}}>
          3 Results
        </Text>
        <FlatList
          style={{paddingHorizontal: Spacing.small}}
          data={songs}
          renderItem={({item}) => <SongCard song={item} />}
          keyExtractor={item => item.songId}
        />
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

export default ResultsScreen;
