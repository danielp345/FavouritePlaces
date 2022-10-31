import { StyleSheet, View, Image, Text, Alert } from "react-native"
import { Colors } from "../../constants/colors"
import OutlinedButton from "../UI/OutlinedButton"
import {
	getCurrentPositionAsync,
	PermissionStatus,
	useForegroundPermissions,
} from "expo-location"
import { useEffect, useState } from "react"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import MapView, { Marker } from "react-native-maps"

const LocationPicker = ({ onTakeLocation }) => {
	const { navigate } = useNavigation()
	const route = useRoute()
	const isFocused = useIsFocused()

	const [pickedLocation, setPickedLocation] = useState()
	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions()

	useEffect(() => {
		if (isFocused) {
			const mapPickedLocation = route.params
			setPickedLocation(mapPickedLocation)
		}
	}, [route, isFocused])

	useEffect(() => {
		onTakeLocation(pickedLocation)
	}, [pickedLocation, onTakeLocation])

	const verifyPermissions = async () => {
		if (
			locationPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission()
			return permissionResponse.granted
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant camera permissions to use this app."
			)

			return false
		}

		return true
	}

	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions()

		if (!hasPermission) {
			return
		}

		const location = await getCurrentPositionAsync()

		setPickedLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		})
		onTakeLocation(pickedLocation)
	}

	const pickOnMapHandler = () => {
		navigate("Map")
	}

	let locationPreview = <Text>No location picked yet.</Text>

	if (pickedLocation) {
		locationPreview = (
			// <Image
			// 	source={{
			// 		uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
			// 	}}
			// 	style={styles.image}
			// />
			<MapView
				region={{
					latitude: pickedLocation.lat,
					longitude: pickedLocation.lng,
					latitudeDelta: 0.001,
					longitudeDelta: 0.001,
				}}
				style={{ width: "100%", height: 200 }}>
				<Marker
					title="Picked location"
					coordinate={{
						latitude: pickedLocation.lat,
						longitude: pickedLocation.lng,
					}}
				/>
			</MapView>
		)
	}

	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton icon="location" onPress={getLocationHandler}>
					Locate user
				</OutlinedButton>
				<OutlinedButton icon="map" onPress={pickOnMapHandler}>
					Pick on map
				</OutlinedButton>
			</View>
		</View>
	)
}

export default LocationPicker

const styles = StyleSheet.create({
	mapPreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
		overflow: "hidden",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
})
