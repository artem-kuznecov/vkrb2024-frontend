import axios from 'axios'

export async function getAllKnowledgebases (username: string) {
  const response = await axios.get('http://server:8080/api/mlv' + `?username=${username}`)
  // const response = await axios.get('server' + `?username=${username}`)
  // const response = await axios({
  //   baseURL: 'server',
  //   url: `?username=${username}`
  // })
  const data = response.data
  return data
}

export async function uploadKnowledgebase (body: FormData) {
  const response = await axios.post('http://server:8080/api/mlv' as string, body)
  // const response = await axios({
  //   method: 'post',
  //   baseURL: 'server',
  //   url: '/',
  //   data: body
  // })
  const data = response.data
  return data
}

export async function getKnowledgebaseParameters (knowledgebaseUUID: string) {
  const response = await axios.get('http://server:8080/api/mlv' + `/parameters/${knowledgebaseUUID}`)
  // const response = await axios({
  //   baseURL: 'server',
  //   url: `/parameters/${knowledgebaseUUID}`
  // })
  const data = response.data
  return data
}

export async function calculateKnowledgebase (knowledgebaseUUID: string, body: any) {
  const response = await axios.post('http://server:8080/api/mlv' + `/calculate/${knowledgebaseUUID}`, body)
  // const response = await axios({
  //   method: 'post',
  //   baseURL: 'server',
  //   url: `/calculate/${knowledgebaseUUID}`,
  //   data: body
  // })
  const data = response.data
  return data
}