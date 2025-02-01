import axios from 'axios'

// IMPORTANT: Under normal circumstances, this would be an environment varible and hidden to users
// I have kept the API URL here because environment variables do not get cloned and thus the api call would fail
// The best pactice would be to hide this url
const API_URL = "https://6799ee3d747b09cdcccd06bc.mockapi.io/api/v1/users"

export interface User{
  createdAt: string
  userName: string
  country: string
  id: string
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching user data', error)
    return []
  }
}