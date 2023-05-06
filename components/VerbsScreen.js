import { Text, View, StyleSheet } from "react-native";
import VerbList from "./VerbList";

export default function VerbsScreen() {
	return (
		<View style={styles.container}>
			<VerbList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// paddingLeft: 10,
	}
})