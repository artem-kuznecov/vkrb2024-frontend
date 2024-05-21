import axios from 'axios'

export async function getAllKnowledgebases (username: string) {
  const response = await axios.get(process.env.NEXT_PUBLIC_MLV_SERVER_URL + `?username=${username}`)
  const data = response.data
  return data
}

export async function uploadKnowledgebase (body: FormData) {
  const response = await axios.post(process.env.NEXT_PUBLIC_MLV_SERVER_URL as string, body)
  const data = response.data
  return data
}