import {
	Text,
	View,
	FlatList,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import themeStyles from "../themeStyles";

const VerbItem = ({ item, style }) => {
	const itemStyle = StyleSheet.flatten([styles.container, style]);

	return (
		<TouchableOpacity>
			<View style={itemStyle}>
				<View style={styles.rankView}>
					<Text style={styles.rank}>{item.rank}</Text>
				</View>
				<View style={styles.verbView}>
					<Text style={styles.verb}>{item.name}</Text>
				</View>
				<View style={styles.translationView}>
					<Text style={styles.translation}>- {item.translation}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: "row",
	},
	rankView: {
		paddingHorizontal: 0,
		borderRightWidth: 1,
		borderRightColor: 'gray',
		width: 30,
	},
	rank: {
		textAlign: 'center',
	},
	verbView: {
		marginLeft: 10,
	},
	verb: {
		fontWeight: 'bold',
	},
	translation: {
		color: 'gray',
	}
});

export default VerbItem;