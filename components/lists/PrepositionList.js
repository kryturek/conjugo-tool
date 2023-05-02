import React from 'react';
import { Text, View, FlatList } from 'react-native';
import prepositions from '../../data/prepositions.json';

const PrepositionList = () => {
  return (
    <View>
      <FlatList
        data={prepositions}
        renderItem={({ item }) => (
          <View>
            <Text>{item.word} - {item.translation}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PrepositionList;
