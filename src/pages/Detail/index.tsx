/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Linking,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';
import styles from './styles';

interface IPoint {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
  image_url: string;
  items: {
    title: string;
  }[];
}

type ParamList = {
  Detail: {
    point_id: number;
  };
};

const Detail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();

  const routeParams = route.params;

  const [point, setPoint] = useState<IPoint>();

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then((response) => {
      setPoint(response.data);
    });
  }, []);

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${point?.whatsapp}&text=Tenho interesse sobre coleta de resíduos`
    );
  }
  function handleComposeMail() {
    if (!point) return;

    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [point.email],
    });
  }

  if (!point) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: point.image_url }} />

        <Text style={styles.pointName}>{point.name}</Text>
        <Text style={styles.pointItems}>
          {point.items.map((item) => item.title).join(', ')}
        </Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {point.city}, {point.uf}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
