import { Text, View, StyleSheet } from "react-native";
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameScreen from "./GameScreen";
import VerbsScreen from "./VerbsScreen";
import VocabScreen from "./VocabScreen";

const Stack = createNativeStackNavigator();

export default function SettingsScreen() {
	return (
		<Stack.Navigator>
		  {/* <Stack.Screen name="Home" component={GameScreen} /> */}
		  <Stack.Screen name="VerbsScreen" component={VerbsScreen} />
		  <Stack.Screen name="Profile" component={VocabScreen} />
		</Stack.Navigator>
		// <View>
		// 	<Text>hello</Text>
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 50,
	},
});
