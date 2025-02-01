import { useEffect, useState } from "react"
import { View, Text, FlatList, StyleSheet, Button } from "react-native"
import { fetchUsers, User } from "../services/api"

const UserList = () => {
	const [users, setUsers] = useState<User[]>([])
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

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

	return (
		<View style={{ flex: 1, padding: 16, backgroundColor: "#f8f9fa" }}>
			{/* User List */}
			<FlatList
				data={users}
				keyExtractor={(item) => item.id}
				renderItem={({ item }: { item: User }) => (
					<View style={styles.userBox}>
						<Text style={styles.username}>{item.userName}</Text>
						<Text style={styles.date}>
							{new Date(item.createdAt).toDateString()}
						</Text>
					</View>
				)}
			/>

			{/* Pagination, Ordering and Filtering Buttons */}
			<View style={{ marginBottom: 12 }}>
				<Button
					onPress={sortUsersByDate}
					title={`Sort by Date (${sortOrder.toUpperCase()})`}
          color="#007bff"
				/>
			</View>
		</View>
	)
}

export default UserList

const styles = StyleSheet.create({
	username: { fontSize: 16, fontWeight: "bold", color: "#333" },
	date: { fontSize: 14, color: "#666" },
	userBox: {
		padding: 12,
		backgroundColor: "#fff",
		borderRadius: 8,
		marginBottom: 8,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 3,
		elevation: 2,
	},
})
