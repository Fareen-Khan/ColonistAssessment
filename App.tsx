import UserList from "./components/UserList"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"


export default function App() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
				<UserList />
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
