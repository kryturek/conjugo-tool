import React from 'react';
import { Text, View, FlatList } from 'react-native';
import conjunctions from '../../data/conjunctions.json';

const ConjunctionList = () => {
  return (
    <View>
      <FlatList
        data={conjunctions}
        renderItem={({ item }) => (
          <View>
            <Text>{item.word} - {item.translation}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ConjunctionList;
