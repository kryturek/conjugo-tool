import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
} from "react-native";

const partsOfSpeech = [
	{
	  id: 1,
	  name: "nouns",
	  desc: "Nouns are words that represent people, places, things, or ideas. They are the building blocks of sentences and provide the subjects or objects of verbs.",
	},
	{
	  id: 2,
	  name: "adjectives",
	  desc: "Adjectives are words that describe or modify nouns. They provide additional information about the qualities, characteristics, or attributes of the nouns they modify.",
	},
	{
	  id: 3,
	  name: "adverbs",
	  desc: "Adverbs are words that modify verbs, adjectives, or other adverbs. They often provide information about how, when, where, or to what extent an action or description takes place.",
	},
	{
	  id: 4,
	  name: "prepositions",
	  desc: "Prepositions are words that show relationships between nouns or pronouns and other words in a sentence. They indicate location, time, direction, manner, or other logical relationships.",
	},
	{
	  id: 5,
	  name: "conjunctions",
	  desc: "Conjunctions are words that join words, phrases, or clauses together. They are used to coordinate, connect, or contrast different parts of a sentence, creating relationships between them.",
	},
	{
	  id: 6,
	  name: "interjections",
	  desc: "Interjections are words or phrases that express strong emotions, reactions, or exclamations. They are used to convey surprise, joy, frustration, or other intense feelings.",
	},
 ];
 
 

const VocabScreen = ({ navigation }) => {


	return (
		<View style={styles.container}>
			<FlatList
				data={partsOfSpeech}
				scrollEnabled={true}
				renderItem={({ item }) => {
					let bgcol = item.id % 2 === 0 ? "#EEEEEE" : "#e6e6e6";
					let brcol = item.id % 2 === 0 ? "#CCCCCC" : "#C0C0C0";
					return (
						<TouchableOpacity
							style={[styles.item, {backgroundColor: bgcol, borderLeftWidth: 20, borderLeftColor: brcol}]}
							onPress={() =>
								navigation.navigate(
									item.name.charAt(0).toUpperCase() +
										item.name.slice(1),
									item.name
								)
							}
						>
							<Text style={styles.itemTitle}>{item.name}</Text>
							<Text style={styles.itemDesc}>{item.desc}</Text>
						</TouchableOpacity>
					);
				}}
			/>
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
		paddingLeft: 10,
		paddingRight: 20,
		// borderWidth: 1,
		// borderColor: "gray",
	},
	itemTitle: {
		fontSize: 22,
		color: "#39393a",
		fontWeight: 'bold',
	},
	itemDesc: {
		color: 'gray',
	}
});
