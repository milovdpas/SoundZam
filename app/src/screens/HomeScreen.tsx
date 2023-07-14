import {View} from 'react-native';
import {useEffect} from 'react';
import React from 'react';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoundButton from '../components/buttons/RoundButton';
import {Colors} from '../assets/Stylesheet';
import {Shadow} from 'react-native-shadow-2';
import Footer from '../components/Footer';

const HomeScreen = ({navigation}: any) => {
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

export default HomeScreen;
