import { StyleSheet, Text, View } from "react-native";
import GameScreen from "./components/GameScreen";
import VocabScreen from "./components/VocabScreen";
import VerbsScreen from "./components/VerbsScreen";
import SettingsScreen from "./components/SettingsScreen";
import ListWithCheckboxes from "./components/ListWithCheckboxes";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Octicon from "react-native-vector-icons/Octicons";

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();


export default function App() {
	const size = 46;
	const color = "white";
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Game"
				// activeColor="#ff8552"
				// barStyle={{ backgroundColor: "#39393a" }}
				// shifting={true}
				screenOptions={() => ({
					tabBarShowLabel: false,
					tabBarStyle: {
						height: 120, // set the height as per your requirement
						backgroundColor: "#39393a", // set the background color
					},
				})}
			>
				<Tab.Screen
					name="Game"
					component={GameScreen}
					options={{
						headerShown: false,
						tabBarIcon: ({ focused, color, size }) => {
							return focused ? (
								<Octicon name="play" size={56} color={color} />
							) : (
								<Octicon name="play" size={56} color={color} />
							);
						},
					}}
				/>
				<Tab.Screen
					name="Verbs"
					component={VerbsScreen}
					options={{
						tabBarIcon: ({ focused, color, size }) => {
							return focused ? (
								<Octicon name="apps" size={56} color={color} />
							) : (
								<Octicon name="apps" size={56} color={color} />
							);
						},
					}}
				/>
				<Tab.Screen
					name="Vocabulary"
					component={VocabScreen}
					options={{
						tabBarIcon: ({ focused, color, size }) => {
							return focused ? (
								<Octicon name="book" size={56} color={color} />
							) : (
								<Octicon name="book" size={56} color={color} />
							);
						},
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={SettingsScreen}
					options={{
						tabBarIcon: ({ focused, color, size }) => {
							return focused ? (
								<Octicon name="gear" size={56} color={color} />
							) : (
								<Octicon name="gear" size={56} color={color} />
							);
						},
					}}
				/>
				<Tab.Screen
					name="ListWithCheckboxes"
					component={ListWithCheckboxes}
					options={{
						tabBarIcon: ({ focused, color, size }) => {
							return focused ? (
								<Octicon name="question" size={56} color={color} />
							) : (
								<Octicon name="question" size={56} color={color} />
							);
						},
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
