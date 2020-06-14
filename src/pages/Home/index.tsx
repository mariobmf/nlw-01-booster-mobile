/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const logo = require('../../assets/logo.png');
const imgBackground = require('../../assets/home-background.png');

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={imgBackground}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={logo} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a UF"
            value={uf}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
            onChangeText={setUf}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite Cidade"
            value={city}
            autoCorrect={false}
            onChangeText={setCity}
          />

          <RectButton
            style={styles.button}
            onPress={() => {
              navigation.navigate('Points', { uf, city });
            }}
          >
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
