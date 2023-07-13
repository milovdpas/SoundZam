import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {Colors} from '../assets/Stylesheet';
import SoundCloud from './icons/SoundCloud';
import Text from './Text';

type FooterProps = {
  start?: boolean;
  children?: ReactNode;
};

const Footer = ({start = false, children}: FooterProps) => {
  return start ? (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '5%',
      }}>
      <SoundCloud
        color={Colors.lightPurple}
        // @ts-ignore
        style={{color: Colors.lightPurple}}
        width="75"
        height="42.9"
      />
      <Text size={'xs'} alignment={'center'} color={Colors.lightPurple}>
        This app is a part of SoundCloud
      </Text>
    </View>
  ) : (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5%',
      }}>
      <View style={{flex: 1}} />
      <View
        style={{width: '70%', justifyContent: 'center', alignItems: 'center'}}>
        {children}
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
        <SoundCloud
          color={Colors.lightPurple}
          // @ts-ignore
          style={{color: Colors.lightPurple}}
          width="60"
          height="34.32"
        />
      </View>
    </View>
  );
};

export default Footer;
