import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, TextInput, ScrollView } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'; // Removed unused Card import
import Livros from '../components/Livros';
import CadEmprestimos from '../components/CadEmprestimos';

export default function Home() {
  const [search, setSearch] = useState('');
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const [isSlideBarVisible, setIsSlideBarVisible] = useState(false);

  const updateSearch = (search) => {
    setSearch(search);
  };

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

  // Dados dos cards
  const [livros] = useState([
    { id: '1', livro: 'Orgulho e Preconceito', classe: '1°D', aluno: 'Gustavo', sexo: 'M', status: 'Emprestado' },
    { id: '2', livro: 'Harry Potter e a Pedra Filosofal', classe: '2°A', aluno: 'Ana', sexo: 'F', status: 'Emprestado' },
    { id: '3', livro: 'O Pequeno Príncipe', classe: '3°B', aluno: 'Lucas', sexo: 'M', status: 'Devolvido' },
    { id: '4', livro: 'A Culpa é das Estrelas', classe: '3°C', aluno: 'Maria', sexo: 'F', status: 'Emprestado' },
    { id: '5', livro: 'A Metamorfose', classe: '2°B', aluno: 'Pedro', sexo: 'M', status: 'Devolvido' },
  ]);

  // Função para renderizar os itens da lista
  const renderItem = ({ item }) => (
    <Card containerStyle={styles.slideCard}>
      <Text>{item.title}</Text>
    </Card>
  );

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
      
      {/* Cards de Atalho */}
      <View>
        <CadEmprestimos data={livros} renderItem={renderItem} />
      </View>

      {/* Barra lateral animada */}
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
    width: width * 0.12, // 12% of screen width
    height: width * 0.12,
    borderRadius: 15,
    marginLeft: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    paddingTop: '2%',
  },
  bottomContainer2: {
    width: '100%',
    height: height * 0.18, // 15% of screen height
    backgroundColor: 'gray',
  },
  textoBranco: {
    marginTop: 20,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoAzulEscuro: {
    color: '#292937',
    fontWeight: 'bold',
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
