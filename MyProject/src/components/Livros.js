import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

export default function Livros({ data }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.TodosCardsEmprestimo}>
        {data.map((item) => (
          <View key={item.id} style={styles.CardEmprestimos}>
            <Text style={styles.cardText}><Text style={styles.boldText}>ID:</Text> {item.id}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Livro:</Text> {item.livro}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 20,
  },
  bottomContainer: {
    width: '100%',
    height: '60%', // 60% da altura da tela
    backgroundColor: 'white',
    marginTop: '6%',
    justifyContent: 'center',
  },
  slideContainer: {
    height: Dimensions.get('window').height * 0.3,
    marginTop: 15,
  },
  CardEmprestimos: {
    width: '90%',
    borderRadius: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    padding: 15,
    marginBottom: 20,
  },
  TodosCardsEmprestimo: {
    marginBottom:"26%",
    flex: 1,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
