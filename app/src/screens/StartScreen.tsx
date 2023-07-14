import {TouchableOpacity, View} from 'react-native';
import {useEffect} from 'react';
import React from 'react';
import RoundButton from '../components/buttons/RoundButton';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Spacing} from '../assets/Stylesheet';
import Text from '../components/Text';
import Footer from '../components/Footer';

const StartScreen = ({navigation}: any) => {
  useEffect(() => {}, []);

  const goToHome = () => {
    navigation.navigate({
      name: 'Home',
    });
  };

  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: '7.5%',
        }}>
        <RoundButton
          type={'primary'}
          size={'small'}
          accessibilityHint={'On press identify song'}
          disabled={true}>
          <MIcon name={'microphone'} size={40} color={Colors.white} />
        </RoundButton>
        <MIcon
          name={'chevron-double-up'}
          size={60}
          color={Colors.white}
          style={{marginTop: Spacing.medium, marginBottom: Spacing.small}}
        />
        <Text
          size={'xl'}
          color={Colors.white}
          style={{marginBottom: Spacing.small}}>
          Welcome
        </Text>
        <Text
          size={'m'}
          color={Colors.lightPurple}
          style={{marginBottom: Spacing.extraLarge}}>
          Tap this button when you hear music or start singing and we will tell
          you what is the track on SoundCloud!
        </Text>
        <TouchableOpacity onPress={goToHome}>
          <Text size={'l'} color={Colors.orange} fontStyle={'bold'}>
            GOT IT
          </Text>
        </TouchableOpacity>
      </View>
      <Footer start={true} />
    </View>
  );
};
export default StartScreen;
