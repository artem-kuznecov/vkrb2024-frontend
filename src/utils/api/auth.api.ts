import axios from 'axios'

import type { LoginDataType, RegisterDataType } from '@/data/types'

export async function login (requestData: LoginDataType) {
  const requestBody = {
    username: requestData.username,
    password: requestData.password,
  }
  const response = await axios.post(process.env.NEXT_PUBLIC_AUTH_SERVER_URL + '/login', requestBody)
  const data = response.data
  return data
}

export async function logout (username: string) {
  const response = await axios.delete(process.env.NEXT_PUBLIC_AUTH_SERVER_URL + `/${username}/logout`)
  const data = response.data
  return data
}

export async function register (requestData: RegisterDataType) {
  const requestBody = {
    username: requestData.username,
    password: requestData.password,
  }
  const response = await axios.post(process.env.NEXT_PUBLIC_AUTH_SERVER_URL + '/register', requestBody)
  const data = response.data
  return data
}