import { StyleSheet, View, Alert, Image, Text } from "react-native"
import {
	launchCameraAsync,
	useCameraPermissions,
	PermissionStatus,
} from "expo-image-picker"
import { useState } from "react"
import { Colors } from "../../constants/colors"
import OutlinedButton from "../UI/OutlinedButton"

const ImagePicker = ({ onTakeImage }) => {
	const [pickedImageUri, setPickedImageUri] = useState("")
	const [cameraPermissionInformation, requestPermission] =
		useCameraPermissions()

	const verifyPermissions = async () => {
		if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission()
			return permissionResponse.granted
		}

		if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant camera permissions to use this app."
			)

			return false
		}

		return true
	}

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions()

		if (!hasPermission) {
			return
		}

		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		})

		setPickedImageUri(image.uri)
		onTakeImage(image.uri)
	}

	let imagePreview = <Text>No image taken yet.</Text>

	if (pickedImageUri.length > 0) {
		imagePreview = (
			<Image source={{ uri: pickedImageUri }} style={styles.image} />
		)
	}

	return (
		<View>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<OutlinedButton icon="camera" onPress={takeImageHandler}>
				Take image
			</OutlinedButton>
		</View>
	)
}

export default ImagePicker

const styles = StyleSheet.create({
	imagePreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
})
