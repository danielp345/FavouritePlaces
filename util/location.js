const GOOGLE_API_KEY = ""

export const getMapPreview = (lat, lng) => {
	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng},&key=${GOOGLE_API_KEY}`

	return imagePreviewUrl
}

export const getAddress = async (lat, lng) => {
	const url = "google api geocode"
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error("Failed to fetch address!")
	}

	const data = await response.json()

	const address = data.results[0].formatted_address

	return address
}
