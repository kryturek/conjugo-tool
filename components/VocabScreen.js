import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
} from "react-native";
import GameScreen from "./GameScreen";

const partsOfSpeech = [
	"nouns",
	"adjectives",
	"adverbs",
	"prepositions",
	"conjunctions",
	"interjections",
];

const VocabScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<FlatList data={partsOfSpeech} scrollEnabled={false} renderItem={({ item }) => (
				<TouchableOpacity style={styles.item} onPress={() => navigation.navigate(item.charAt(0).toUpperCase()+item.slice(1), item)}>
					<Text style={styles.itemTitle}>{item}</Text>
				</TouchableOpacity>
			)}/>
		</View>
	);
};

export default VocabScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
	},
	itemTitle: {
		fontSize: 24,
		color: '#39393a'
	}
});
