import { StyleSheet, TextInput, Platform } from "react-native";

export default function UserInput(props) {
	const fontFamily = Platform.OS === 'android' ? 'monospace' : Platform.OS === 'ios' ? 'American Typewriter' : 'System';

	return (
		<TextInput
			style={[styles.userInput, {fontFamily}]}
			onChangeText={props.setAnswer}
			value={props.answer}
			placeholder="..."
		/>
	);
}

const styles = StyleSheet.create({
	userInput: {
		height: 50,
		width: 300,
		alignSelf: 'center',
		borderColor: "gray",
		// borderWidth: 1,
		borderBottomWidth: 3,
		marginBottom: 20,
		fontSize: 32,
		textAlign: 'center',
		backgroundColor: 'lightgray',
		color: '#222',
	},
})