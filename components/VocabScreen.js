import { Text, View, StyleSheet } from "react-native";

export default function VocabScreen() {
	return (
		<View style={styles.container}>
			<Text>Vocabulary screen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 50,
	}
})