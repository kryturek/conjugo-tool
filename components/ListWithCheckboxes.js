import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';

const data = [
  { "mood": "indicative", "tense": "present" },
  { "mood": "indicative", "tense": "imperfect" },
  { "mood": "indicative", "tense": "preterite" },
  { "mood": "indicative", "tense": "future" },
  { "mood": "indicative", "tense": "present_perfect" },
  { "mood": "indicative", "tense": "past_perfect" },
  { "mood": "indicative", "tense": "past_anterior" },
  { "mood": "indicative", "tense": "future_perfect" },
  { "mood": "conditional", "tense": "simple_conditional" },
  { "mood": "conditional", "tense": "perfect" },
  { "mood": "imperative", "tense": "affirmative" },
  { "mood": "imperative", "tense": "negative" },
  { "mood": "subjunctive", "tense": "present" },
  { "mood": "subjunctive", "tense": "present_perfect" },
  { "mood": "subjunctive", "tense": "pluperfect" },
  { "mood": "subjunctive", "tense": "future_perfect" },
  { "mood": "subjunctive", "tense": "imperfect" },
  { "mood": "subjunctive", "tense": "imperfect_se" },
  { "mood": "subjunctive", "tense": "future" }
];

const ListWithCheckboxes = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckBoxPress = (item) => {
    const isSelected = selectedItems.includes(item);
    const updatedSelection = isSelected
      ? selectedItems.filter((selected) => selected !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedSelection);
    console.log(selectedItems);
  };

  const renderItem = ({ item }) => {
    const { mood, tense } = item;
    const isSelected = selectedItems.includes(item);

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          value={isSelected}
          onValueChange={() => handleCheckBoxPress(item)}
        />
        <Text>{`${mood} ${tense}`}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.mood}-${item.tense}`}
    />
  );
};

export default ListWithCheckboxes;
