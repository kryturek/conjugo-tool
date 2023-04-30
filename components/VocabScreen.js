import React, { useState } from "react";
import { Dimensions } from "react-native";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
} from "react-native";

const partsOfSpeech = [
	"nouns",
	"adjectives",
	"adverbs",
	"prepositions",
	"conjunctions",
	"interjections",
];



const VocabScreen = () => {

	const [backgroundColor, setBackgroundColor] = useState({
		nouns: 'red',
		adjectives: 'yellow',
		adverbs: 'orange',
		prepositions: 'green',
		conjunctions: 'purple',
		interjections: 'gray'
	 });

	const renderItem = ({ item }) => {
		const textColor = item === 'adjectives' ? 'black' : 'white';

		return (
		  <TouchableOpacity style={[styles.item, { backgroundColor: backgroundColor[item] }]}>
			 <Text style={[styles.title, { color: textColor} ]}>{item}</Text>
		  </TouchableOpacity>
		);
	 };

	return (
		<View style={styles.container}>
			<FlatList
				data={partsOfSpeech}
				renderItem={renderItem}
				keyExtractor={(item) => item}
				contentContainerStyle={styles.flatListContainer}
				scrollEnabled={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flatListContainer: {
		flexGrow: 1,
		justifyContent: 'space-evenly'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		
	}
});

export default VocabScreen;
