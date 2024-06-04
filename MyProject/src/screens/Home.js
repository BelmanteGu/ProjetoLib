import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, TextInput } from 'react-native';
import { SearchBar, Card, Icon } from 'react-native-elements';
import Cards from '../components/Cards';
import CardList from '../components/CardList';

export default function Home() {
  // Estado para a barra de pesquisa
  const [search, setSearch] = useState('');

  // Animação para a barra lateral
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current; // Slide in from bottom

  // Estado para controlar a visibilidade da barra lateral
  const [isSlideBarVisible, setIsSlideBarVisible] = useState(false);

  // Função para atualizar a pesquisa
  const updateSearch = (search) => {
    setSearch(search);
  };

  // Dados dos cards
  const [data] = useState([
    { id: '1', title: 'Dom Casmurro' },
    { id: '2', title: '1984' },
    { id: '3', title: 'O Alquimista' },
    { id: '4', title: 'A Menina que Roubava Livros' },
    { id: '5', title: 'O Pequeno Príncipe' },
    { id: '6', title: 'A Revolução dos Bichos' },
    { id: '7', title: 'O Senhor dos Anéis' },
    { id: '8', title: 'O Hobbit' },
    { id: '9', title: 'Cem Anos de Solidão' },
    { id: '10', title: 'O Nome do Vento' },
  ]);

  // Função para alternar a visibilidade da barra lateral
  const toggleSlideBar = () => {
    if (isSlideBarVisible) {
      // Slide out
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsSlideBarVisible(false));
    } else {
      setIsSlideBarVisible(true);
      // Slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Função para renderizar os itens da lista
  const renderItem = ({ item }) => (
    <Card containerStyle={styles.slideCard}>
      <Text>{item.title}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
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
            name='bookmark' // Nome do ícone, você pode substituir por qualquer ícone disponível
            type='material' // Tipo do ícone, 'material' é apenas um exemplo, você pode escolher o tipo correto para o seu ícone
            color='#fff' // Cor do ícone
            size={30} // Tamanho do ícone
          />
        </TouchableOpacity>
      </View>
      
      {/* Cards de Atalho */}
      <View style={styles.cardContainer}>
        <Cards background='white'/>
        <Cards text="Dado2"/>
        <Cards text="Dado3"/>
        <Cards text="Dado4"/>
      </View>
      
      {/* Lista de Cards */}
      <View>
        <CardList data={data} renderItem={renderItem} />
      </View>
      
      {/* Contêiner inferior */}
      <View style={styles.bottomContainer2}></View>
      
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
