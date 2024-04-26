/* eslint-disable no-param-reassign */
import axios from 'axios'
import { getIdToken } from './tokenUtils'
import { getAuthTokenByRefreshToken } from './authUtil'
import { MESSAGES } from './consts'

const API_BASE_URL = 'https://backend.Maiai.app'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
})

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async config => {
    const idToken = getIdToken()
    if (!idToken) {
      // Check if idToken is empty
      throw new Error('Empty id token') // Throw error if idToken is empty
    }
    config.headers = {
      Authorization: `Bearer ${idToken}`
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
    const message = error.response ? error.response?.data?.message : null
    if (status === 403) {
      if (message === MESSAGES.CREDENTIALS_ERROR) {
        await getAuthTokenByRefreshToken()
        return
      } else if (message === MESSAGES.UPGRADE_TO_PREMIUM_ERROR) {
        return Promise.reject(error)
      }
      console.log('subscription Error', message)
    } else if (status === 401) {
      await getAuthTokenByRefreshToken()
      return
    }
    return Promise.reject(error)
  }
)

export { axiosInstance }
