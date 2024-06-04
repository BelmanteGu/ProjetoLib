// Arquivo: CardList.js

import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';

export default function CardList({ data, renderItem }) {
  return (
    <View style={styles.bottomContainer}>
      <Text style={styles.textoLivrosMomento}>Livros do <Text style={styles.textoMomento}>Momento</Text></Text>
      <FlatList
        style={styles.slideContainer}
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = {
  bottomContainer: {
    width: '100%',
    height: '60%', // 37% da altura da tela
    backgroundColor: 'white',
    marginTop: '6%',
    justifyContent: 'center',
  },
  textoLivrosMomento: {
    marginTop: 20,
    color: '#292937',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoMomento: {
    color: '#3A89FF',
    fontWeight: 'bold',
  },
  slideContainer: {
    marginTop: 15,
  },
};
