import { Text, View, StyleSheet } from "react-native";

export default function VerbsScreen() {
	return (
		<View style={styles.container}>
			<Text>Verbs screen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 50,
	}
})