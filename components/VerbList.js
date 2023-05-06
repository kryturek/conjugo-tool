import { Text, View, FlatList, StyleSheet } from "react-native";
import VerbItem from "./VerbItem";
import themeStyles from "../themeStyles";

const data = require("../data/verbs.json")

const VerbList = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({item}) => {
					let bgcol = item.rank %2 === 0 ? "#EEEEEE" : "#e6e6e6";
					return <VerbItem item={item} style={{backgroundColor: bgcol}}/>
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// height: '100%',
		// width: '100%',
	}
})

export default VerbList;