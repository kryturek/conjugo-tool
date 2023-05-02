import React from 'react';
import { Text, View, FlatList } from 'react-native';
import interjections from '../../data/interjections.json';

const InterjectionList = () => {
  return (
    <View>
      <FlatList
        data={interjections}
        renderItem={({ item }) => (
          <View>
            <Text>{item.word} - {item.translation}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default InterjectionList;
