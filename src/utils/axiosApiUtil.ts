/* eslint-disable no-param-reassign */
import axios from 'axios'
import { getIdToken } from './tokenUtils'
import { getAuthTokenByRefreshToken } from './authUtil'

const API_BASE_URL = 'https://backend.milaai.app'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
})

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async config => {
    const idToken = getIdToken()
    let authToken = idToken // storeState?.idToken ?? "";
    config.headers = {
      Authorization: `Bearer ${authToken}`
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response ? error.response.status : null
    if (status === 403) {
      await getAuthTokenByRefreshToken()
    }
    return Promise.reject(error)
  }
)

export { axiosInstance }
