import { StyleSheet, Text, View, ScrollView, Image } from "react-native"
import { useEffect, useState } from "react"
import OutlinedButton from "../components/UI/OutlinedButton"
import { Colors } from "../constants/colors"
import { fetchPlaceDetails } from "../util/database"

const PlaceDetails = ({ route, navigation }) => {
	const [fetchedPlace, setFetchedPlace] = useState()

	const showOnMapHandler = () => {
		navigation.navigate("Map", {
			lat: fetchedPlace.location.lat,
			lng: fetchedPlace.location.lng,
		})
	}

	const selectedPlaceId = route.params.placeId

	useEffect(() => {
		const fetchPlace = async () => {
			const place = await fetchPlaceDetails(selectedPlaceId)
			setFetchedPlace(place)
			navigation.setOptions({
				title: place.title,
			})
		}
		fetchPlace()
	}, [selectedPlaceId])

	if (!fetchedPlace) {
		return (
			<View style={styles.fallback}>
				<Text style={styles.address}>Loading place data...</Text>
			</View>
		)
	}

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{fetchedPlace.address}</Text>
				</View>
				<OutlinedButton icon="map" onPress={showOnMapHandler}>
					View on Map
				</OutlinedButton>
			</View>
		</ScrollView>
	)
}

export default PlaceDetails

const styles = StyleSheet.create({
	fallback: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		height: "35%",
		minHeight: 300,
		width: "100%",
	},
	locationContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	addressContainer: {
		padding: 20,
	},
	address: {
		color: Colors.primary500,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
})
