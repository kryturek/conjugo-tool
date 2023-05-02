import React from 'react';
import { Text, View, FlatList } from 'react-native';
import adjectives from '../../data/adjectives.json';

const AdjectiveList = () => {
  return (
    <View>
      <FlatList
        data={adjectives}
        renderItem={({ item }) => (
          <View>
            <Text>{item.word} - {item.translation}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AdjectiveList;
