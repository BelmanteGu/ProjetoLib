import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, TextInput, FlatList } from 'react-native';
import { SearchBar, Card, Icon } from 'react-native-elements';
import Livros from '../components/Livros';

export default function Home() {
  const [search, setSearch] = useState('');
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const [isSlideBarVisible, setIsSlideBarVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const updateSearch = (search) => {
    setSearch(search);
    const filtered = livros.filter(book =>
      book.livro.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const [livros] = useState([
    { id: '1', livro: 'Dom Casmurro' },
    { id: '2', livro: '1984' },
    { id: '3', livro: 'O Alquimista' },
    { id: '4', livro: 'A Menina que Roubava Livros' },
    { id: '5', livro: 'O Pequeno Príncipe' },
    { id: '6', livro: 'A Revolução dos Bichos' },
    { id: '7', livro: 'O Senhor dos Anéis' },
    { id: '8', livro: 'O Hobbit' },
    { id: '9', livro: 'Cem Anos de Solidão' },
    { id: '10', livro: 'O Nome do Vento' },
  ]);

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.slideCard}>
      <Text>{item.livro}</Text>
    </Card>
  );

  const toggleSlideBar = () => {
    if (isSlideBarVisible) {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsSlideBarVisible(false));
    } else {
      setIsSlideBarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder='Busque o livro que deseja...'
          onChangeText={updateSearch}
          value={search}
          lightTheme
          round
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
        />
        <TouchableOpacity style={styles.button} onPress={toggleSlideBar}>
          <Icon
            name='bookmark'
            type='material'
            color='#fff'
            size={30}
          />
        </TouchableOpacity>
      </View>

      {search.length > 0 && (
        <View style={styles.filteredBooksContainer}>
          <Text style={styles.filteredBooksTitle}>Livros Pesquisados:</Text>
          <FlatList
            data={filteredBooks}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      {isSlideBarVisible && (
        <Animated.View style={[styles.slideBar, { transform: [{ translateY: slideAnim }], bottom: 0, left: 0, right: 0, top: 'auto', height: '60%', width: '100%' }]}>
          <View>
            <Text style={styles.textoBranco}>Ficha de <Text style={styles.textoAzulEscuro}>Empréstimo</Text></Text>
            <View style={styles.InfosCad}>
              <View style={styles.EspacoCadastro}>
                <TextInput style={styles.TextoCad} placeholder='Livro que deseja emprestar' />
              </View>
              <View style={styles.EspacoCadastro}>
                <TextInput style={styles.TextoCad} placeholder='RA ou Nome do Aluno' />
              </View>
              <View style={styles.EspacoCadastro}>
                <TextInput style={styles.TextoCad} placeholder='Data de Devolução' />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={toggleSlideBar} style={styles.BotaoCad}>
            <Text style={styles.BotaoCadTexto}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSlideBar} style={styles.BotaoCadCancelar}>
            <Text style={styles.BotaoCadTexto}>Cancelar</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Lista de todos os livros */}
      <View style={styles.allBooksContainer}>
        <Text style={styles.allBooksTitle}>Todos os Livros:</Text>
        <Livros data={livros} renderItem={renderItem} />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#3A89FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
    paddingHorizontal: '2%',
    width: '100%',
  },
  searchBarContainer: {
    backgroundColor: '#3A89FF',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    flex: 1,
  },
  searchBarInputContainer: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#292937',
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 15,
    marginLeft: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filteredBooksContainer: {
    backgroundColor: '#2C3E50',
    padding: 10,
    marginBottom: 10,
  },
  filteredBooksTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  allBooksContainer: {
    flex: 1,
  },
  allBooksTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  slideBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#3A89FF',
    zIndex: 10,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  BotaoCad: {
    backgroundColor: '#69A5FF',
    padding: 10,
    borderRadius: 10,
    marginBottom: '3%',
  },
  BotaoCadCancelar: {
    backgroundColor: '#d14438',
    padding: 10,
    borderRadius: 10,
    marginBottom: '3%',
  },
  BotaoCadTexto: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slideCard: {
    borderRadius: 15,
    marginRight: 10,
    width: 150,
    height: 190,
  },
  selectedBook: {
    backgroundColor: 'red',
  },
  EspacoCadastro: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    marginTop: '5%',
    borderRadius: 15,
  },
  TextoCad: {
    marginLeft: 10,
  },
  InfosCad: {
    marginTop: '5%',
    marginBottom: '5%',
  },
});
