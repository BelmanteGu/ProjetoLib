import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, FlatList } from 'react-native';
import { SearchBar, Card, Icon } from 'react-native-elements';

export default  function Cards({ text = 'oi', background = 'white', imagem}) {
    const styles = StyleSheet.create({
        cardContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: '2%',
          paddingTop: '2%',
      
        },
        card: {
          backgroundColor: background,
          width:150, // slightly less than 50% to account for spacing
          height:  100, // 20% of screen height
          borderRadius: 15,
          borderColor: background,

          marginBottom: '2%',
        },
        
      });

    return (
        <View style={styles.cardContainer }>
            <Card title="Card de Informação" containerStyle={styles.card}>
                <Text>{text}</Text>
            </Card>

        </View>
    )
}