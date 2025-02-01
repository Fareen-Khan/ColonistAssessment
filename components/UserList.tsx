import { useEffect, useState } from "react"
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Button,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from "react-native"
import { fetchUsers, User } from "../services/api"
import { pagination } from "../hooks/pagination"

const UserList = () => {
	const [users, setUsers] = useState<User[]>([])
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
	const [selectedCountry, setselectedCountry] = useState("")

	useEffect(() => {
		loadUsers()
	}, [])

	const loadUsers = async () => {
		const data = await fetchUsers()
		setUsers(data)
	}

	const sortUsersByDate = () => {
		const newOrder = sortOrder === "asc" ? "desc" : "asc"
		setSortOrder(newOrder)
		setUsers(
			[...users].sort((firstUser, secondUser) =>
				newOrder === "asc"
					? firstUser.createdAt.localeCompare(secondUser.createdAt)
					: secondUser.createdAt.localeCompare(firstUser.createdAt)
			)
		)
	}

	const usersByCountry =
		selectedCountry === ""
			? users
			: users.filter((user) => user.country === selectedCountry)

	const {
		currentPage,
		totalPages,
		paginatedUsers,
		goToNextPage,
		goToPreviousPage,
	} = pagination(usersByCountry)

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<View style={styles.listBox}>
				{/* User List */}
				<FlatList
					data={paginatedUsers}
					keyExtractor={(item) => item.id}
					renderItem={({ item }: { item: User }) => (
						<View style={styles.userBox}>
							<View style={styles.inLineBox}>
								<Text style={styles.username}>{item.userName}</Text>
								<Text style={styles.username}>{item.country}</Text>
							</View>
							<Text style={styles.date}>
								{new Date(item.createdAt).toDateString()}
							</Text>
						</View>
					)}
				/>
				{/* Pagination, Ordering and Filtering Buttons */}
				<View style={{ marginBottom: 12 }}>
					{/* Sort By Date */}
					<Button
						onPress={sortUsersByDate}
						title={`Sort by Date (${sortOrder.toUpperCase()})`}
						color="#007bff"
					/>
					{/* Filter Country */}
					<TextInput
						value={selectedCountry}
						placeholder="Filter by Country"
						onChangeText={(text) => setselectedCountry(text.toUpperCase())}
						style={styles.inputBox}
					/>
				</View>
				{/* Pagination */}
				<View style={styles.controlsBox}>
					<Button
						title="Previous"
						onPress={goToPreviousPage}
						color="#007bff"
						disabled={currentPage === 1}
					/>
					<Text>
						{currentPage} / {totalPages}
					</Text>
					<Button
						title="Next"
						onPress={goToNextPage}
						color="#007bff"
						disabled={currentPage === totalPages}
					/>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}

export default UserList

const styles = StyleSheet.create({
	username: { fontSize: 16, fontWeight: "bold", color: "#333" },
	date: { fontSize: 14, color: "#666" },
	userBox: {
		padding: 12,
		backgroundColor: "#FBFBFB",
		borderRadius: 8,
		margin: 8,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 3,
		elevation: 2,
	},
	inputBox: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		borderRadius: 10,
		marginTop: 5,
	},
	controlsBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
	},
	listBox: { flex: 1, padding: 16, backgroundColor: "#FBFBFB" },
	inLineBox: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
})
