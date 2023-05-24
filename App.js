/*
	The App component is the root component that sets up the navigation and tab bar structure using React Navigation. 
	It consists of a tab navigator with screens for different functionalities.
	Inside the component, the selected tenses state is defined using useState. It starts with the default value of "indicative/present" tense. 
	The Octicon library availability is checked using useState and useEffect.
	The component renders the NavigationContainer component, which wraps the tab navigator created with createBottomTabNavigator. 
	ach tab screen is defined using Tab.Screen, specifying the component and options.
	The "Game" screen renders the GameScreen component and passes the selected tenses as props. 
	The "Verbs" and "Vocabulary" screens use the respective components without additional props. 
	The "Settings" screen renders the SettingsScreen component and passes the selected tenses and setSelectedTenses function as props.
	Tab icons are rendered using the Octicon component from react-native-vector-icons. Different icons are displayed when the tab is focused or not.
	The App component applies styles using StyleSheet.create.
	Overall, the App component sets up navigation, manages selected tenses, and renders screens with appropriate props and icons.
*/

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Octicon from "react-native-vector-icons/Octicons";

import GameScreen from "./components/GameScreen";
import VocabScreen from "./components/VocabScreen";
import VocabStack from "./routes/VocabStack";
import VerbsScreen from "./components/VerbsScreen";
import SettingsScreen from "./components/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
	// Select tenses to choose from at the start of the application
	// Indicative/present is the default, more tenses can be chosen in the settings tab
	const [selectedTenses, setSelectedTenses] = useState([
		{ mood: "indicative", tense: "present" },
	]);

	const size = 56;
	const color = "white";
	const [isOcticonAvailable, setIsOcticonAvailable] = useState(false);

	useEffect(() => {
		// Check if the Octicon library is available
		const checkOcticonAvailability = async () => {
			try {
				await Octicon.loadFont(); // Load the Octicon font asynchronously
				setIsOcticonAvailable(true); // Set the availability state to true if the font is loaded successfully
			} catch (error) {
				console.error("Error loading Octicon library:", error); // Log the error if the font fails to load
				setIsOcticonAvailable(false); // Set the availability state to false
			}
		};

		checkOcticonAvailability(); // Invoke the function to check the Octicon availability
	}, []);

	if (!isOcticonAvailable) {
		// Return an error UI or handle the error appropriately if Octicon library is not available
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>
					Octicon library is not available. Please check your dependencies.
				</Text>
			</View>
		);
	}

	return (
		<NavigationContainer>
			{/* Create a tab navigator */}
			<Tab.Navigator
				initialRouteName="Game"
				screenOptions={() => ({
					tabBarShowLabel: false, // Hide the tab bar labels
					tabBarStyle: {
						height: 120, // Set the height as per your requirement
						backgroundColor: "#39393a", // Set the background color
					},
				})}
			>
				{/* Define a tab screen for the "Game" screen */}
				<Tab.Screen
					name="Game"
					options={{
						headerShown: false, // Hide the header for this screen
						size: 80, // Set the size as per your requirement
						tabBarIcon: ({ focused, color, size }) => {
							return focused ? ( // Use a different icon when the tab is focused
								<Octicon name="play" size={56} color={color} />
							) : (
								<Octicon name="play" size={56} color={color} />
							);
						},
					}}
				>
					{/* Pass the selected tenses as props to the GameScreen component */}
					{() => <GameScreen selectedTenses={selectedTenses} />}
				</Tab.Screen>
				{/* Define a tab screen for the "Verbs" screen */}
				<Tab.Screen
					name="Verbs"
					component={VerbsScreen}
					options={{
						tabBarIcon: ({ focused, color, size }) => {
							return focused ? ( // Use a different icon when the tab is focused
								<Octicon name="apps" size={56} color={color} />
							) : (
								<Octicon name="apps" size={56} color={color} />
							);
						},
					}}
				/>
				{/* Define a tab screen for the "Vocabulary" screen */}
				<Tab.Screen
					name="Vocabulary"
					component={VocabStack}
					options={{
						headerShown: false, // Hide the header for this screen
						tabBarIcon: ({ focused, color, size }) => {
							return focused ? ( // Use a different icon when the tab is focused
								<Octicon name="book" size={56} color={color} />
							) : (
								<Octicon name="book" size={56} color={color} />
							);
						},
					}}
				/>
				{/* Define a tab screen for the "Settings" screen */}
				<Tab.Screen
					name="Settings"
					options={{
						tabBarIcon: ({ focused, color, size }) => {
							return focused ? ( // Use a different icon when the tab is focused
								<Octicon name="gear" size={56} color={color} />
							) : (
								<Octicon name="gear" size={56} color={color} />
							);
						},
					}}
				>
					{/* Pass the selected tenses and setSelectedTenses as props to the SettingsScreen component */}
					{() => (
						<SettingsScreen
							selectedTenses={selectedTenses}
							setSelectedTenses={setSelectedTenses}
						/>
					)}
				</Tab.Screen>
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
	errorContainer: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	errorText: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		marginHorizontal: 20,
	},
});
