import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import PlacesList from "../components/Places/PlacesList"
import { fetchPlaces } from "../util/database"

const AllPlaces = () => {
	const [places, setPlaces] = useState([])
	const isFocused = useIsFocused()
	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchPlaces()
			setPlaces(data)
		}
		if (isFocused) {
			fetchData()
		}
	}, [isFocused])

	return <PlacesList places={places} />
}

export default AllPlaces

const styles = StyleSheet.create({})
