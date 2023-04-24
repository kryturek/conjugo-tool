import { StyleSheet, Text, View } from "react-native";
import GameScreen from "./components/GameScreen";
import VocabScreen from "./components/VocabScreen";
import VerbsScreen from "./components/VerbsScreen";
import SettingsScreen from "./components/SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Octicon from "react-native-vector-icons/Octicons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Game"
				activeColor="#ff8552"
				barStyle={{ backgroundColor: "#39393a" }}
				shifting={true}
			>
				<Tab.Screen
					name="Game"
					component={GameScreen}
					options={{
						tabBarIcon: () => <Octicon name="play" size={26} />,
					}}
				/>
				<Tab.Screen
					name="Verbs"
					component={VerbsScreen}
					options={{
						tabBarIcon: () => <Octicon name="apps" size={26} />,
					}}
				/>
				<Tab.Screen
					name="Vocabulary"
					component={VocabScreen}
					options={{
						tabBarIcon: () => <Octicon name="book" size={26} />,
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={SettingsScreen}
					options={{
						tabBarIcon: () => <Octicon name="gear" size={26} />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ff0000",
		alignItems: "center",
		justifyContent: "center",
	},
});
