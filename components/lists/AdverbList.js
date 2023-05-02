import React from 'react';
import { Text, View, FlatList } from 'react-native';
import adverbs from '../../data/adverbs.json';

const AdverbList = () => {
  return (
    <View>
      <FlatList
        data={adverbs}
        renderItem={({ item }) => (
          <View>
            <Text>{item.word} - {item.translation}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AdverbList;
