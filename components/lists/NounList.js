import React from 'react';
import { Text, View, FlatList } from 'react-native';
import nouns from '../../data/nouns.json';

const NounList = () => {
  return (
    <View>
      <FlatList
        data={nouns}
        renderItem={({ item }) => (
          <View>
            <Text>{item.word} - {item.translation}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NounList;
