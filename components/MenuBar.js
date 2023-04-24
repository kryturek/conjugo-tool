import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Octicon from "react-native-vector-icons/Octicons"

const MenuBar = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button}>
				<Octicon style={[styles.icon, styles.active]} name="play" size={80}/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button}>
				<Octicon style={styles.icon} name="apps" size={80}/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button}>
				<Octicon style={styles.icon} name="book" size={80}/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button}>
				<Octicon style={styles.icon} name="gear" size={80}/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: 120,
		backgroundColor: "white",
		borderTopWidth: 7,
		borderTopColor: "#000",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5
	},
	button: {
		flex: 1,
		backgroundColor: "white",
		alignText: "center",
		alignItems: 'center',
	},
	icon: {
		color: 'gray',
	},
	active: {
		color: 'black',
	},
	buttonText: {
		fontSize: 17,
		fontFamily: 'BradleyHandITCTT-Bold',
		fontWeight: '700',
	},
});

export default MenuBar;
