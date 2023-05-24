/*
  The SelectTenses component renders a list of tenses with checkboxes and manages the selected tenses state. 
  It allows the user to select or deselect tenses and updates the selected tenses accordingly. 
  The component uses a FlatList to render the list of tenses and a handleCheckBoxPress function to handle checkbox selection.
*/

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
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

const SelectTenses = ({selectedTenses, setSelectedTenses}) => {
  // const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // set the first tense in the list to be selected by default
    setSelectedTenses([data[0]]);
  }, []);

  const handleCheckBoxPress = (item) => {
    const isSelected = selectedTenses.includes(item);

    if (isSelected && selectedTenses.length === 1) {
      Alert.alert("At least one tense has to be selected!");
      return;
    }
    const updatedSelection = isSelected
      ? selectedTenses.filter((selected) => selected !== item)
      : [...selectedTenses, item];
      setSelectedTenses(updatedSelection);
  };

  const renderItem = ({ item }) => {
    const { mood, tense } = item;
    const isSelected = selectedTenses.includes(item);

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          value={isSelected}
          onValueChange={() => handleCheckBoxPress(item)}
        />
        <Text>{`${mood} - ${tense.replace(/_/g, " ")}`}</Text>
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

export default SelectTenses;
