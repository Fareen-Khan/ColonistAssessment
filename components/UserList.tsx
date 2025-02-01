import { useEffect, useState } from "react";
import { View, Text } from 'react-native'
import { fetchUsers, User } from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const data = await fetchUsers()
    setUsers(data)
    console.log('users are: ', users)
  }



  return (

    <View>
      <Text>
        Hello World
      </Text>
    </View>
  )
}

export default UserList