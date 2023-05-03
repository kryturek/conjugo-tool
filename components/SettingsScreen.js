import { Text, View, StyleSheet } from "react-native";
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameScreen from "./GameScreen";
import VerbsScreen from "./VerbsScreen";
import VocabScreen from "./VocabScreen";
import SelectTenses from "./SelectTenses";

const Stack = createNativeStackNavigator();

export default function SettingsScreen({selectedTenses, setSelectedTenses}) {
	return (
		<View>
			<SelectTenses selectedTenses={selectedTenses} setSelectedTenses={setSelectedTenses} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 50,
	},
});
