import { Text, View, StyleSheet } from "react-native";

export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			<Text>Settings screen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 50,
	}
})