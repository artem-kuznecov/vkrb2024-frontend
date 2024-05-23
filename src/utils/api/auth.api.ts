import axios from 'axios'

import type { LoginDataType, RegisterDataType } from '@/data/types'

export async function login (requestData: LoginDataType) {
  const requestBody = {
    username: requestData.username,
    password: requestData.password,
  }
  const response = await axios.post('http://server:8080/api/auth' + '/login', requestBody)
  // const response = await axios({
  //   method: 'post',
  //   baseURL: 'server',
  //   url: '/login',
  //   data: requestBody
  // })
  const data = response.data
  return data
}

export async function logout (username: string) {
  const response = await axios.delete('http://server:8080/api/auth' + `/${username}/logout`)
  // const response = await axios({
  //   method: 'delete',
  //   baseURL: 'server',
  //   url: `/${username}/logout`,
  // })
  const data = response.data
  return data
}

export async function register (requestData: RegisterDataType) {
  const requestBody = {
    username: requestData.username,
    password: requestData.password,
  }
  const response = await axios.post('http://server:8080/api/auth' + '/register', requestBody)
  // const response = await axios({
  //   method: 'post',
  //   baseURL: 'server',
  //   url: '/register',
  //   data: requestBody
  // })
  const data = response.data
  return data
}