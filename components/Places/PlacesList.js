import { useNavigation } from "@react-navigation/native"
import { FlatList, StyleSheet, View, Text } from "react-native"
import { Colors } from "../../constants/colors"
import PlaceItem from "./PlaceItem"

const PlacesList = ({ places }) => {
	const { navigate } = useNavigation()

	const selectPlaceHandler = (id) => {
		navigate("PlaceDetails", { placeId: id })
	}

	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No places added yet - start adding some!
				</Text>
			</View>
		)
	}
	return (
		<FlatList
			style={styles.list}
			data={places}
			keyExtractor={(place) => place.id}
			renderItem={({ item }) => (
				<PlaceItem place={item} onSelect={selectPlaceHandler} />
			)}
		/>
	)
}

export default PlacesList

const styles = StyleSheet.create({
	list: {
		margin: 24,
	},
	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 16,
		color: Colors.primary500,
	},
})
