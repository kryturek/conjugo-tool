import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import VocabScreen from "../components/VocabScreen";
// import WordList from "../components/WordList";
import NounList from "../components/lists/NounList";
import AdjectiveList from "../components/lists/AdjectiveList";
import AdverbList from "../components/lists/AdverbList";
import PrepositionList from "../components/lists/PrepositionList";
import ConjunctionList from "../components/lists/ConjunctionList";
import InterjectionList from "../components/lists/InterjectionList";

const Stack = createNativeStackNavigator();

export default function VocabStack() {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Screen name="Parts of speech" component={VocabScreen} />
				<Stack.Screen name="Nouns" component={NounList} />
				<Stack.Screen name="Adjectives" component={AdjectiveList} />
				<Stack.Screen name="Adverbs" component={AdverbList} />
				<Stack.Screen name="Prepositions" component={PrepositionList} />
				<Stack.Screen name="Conjunctions" component={ConjunctionList} />
				<Stack.Screen name="Interjections" component={InterjectionList} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
