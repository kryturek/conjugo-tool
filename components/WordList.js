import { Text, View, TouchableOpacity, FlatList } from "react-native";

export default WordList = ({ route, navigation }) => {
	const partOfSpeech = route.params;

	let data;
	// if (partOfSpeech === "nouns") {
		// }
		
	import("../data/nouns.json").then((words) => {
		data = words;
	})
	return (
		<View>
			<FlatList
				data={data}
				renderItem={({item}) => (
					<Text>{item.word}</Text>
				)}
			/>
		</View>
	);
};
