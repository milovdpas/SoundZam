import {View} from 'react-native';
import {useEffect, useState} from 'react';
import React, {useCallback} from 'react';
import MorphingCircle from '../components/animations/MorphingCircle';
import {Colors} from '../assets/Stylesheet';
import RoundButton from '../components/buttons/RoundButton';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import Text from '../components/Text';

const IdentificationScreen = ({navigation}: any) => {
  const [status, setStatus] = useState<string>('listen');

  const goToResults = useCallback(() => {
    navigation.navigate({
      name: 'Results',
    });
  }, [navigation]);

  const goToHome = () => {
    navigation.navigate({
      name: 'Home',
    });
  };

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
      setTimeout(() => {
        goToResults();
      }, 4000);
    }
  }, [goToResults, status, setStatus]);

  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          height: '70%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MorphingCircle colors={[Colors.orange, Colors.pink]} />
      </View>
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <RoundButton
          type={'secondary'}
          onPress={goToHome}
          accessibilityHint={'On press identify song'}>
          <MIcon name={'square'} size={40} color={Colors.white} />
        </RoundButton>
      </View>
      <Footer start={false}>
        {status === 'listen' ? (
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

export default IdentificationScreen;
