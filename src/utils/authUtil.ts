import { authorize, refresh } from 'react-native-app-auth'
import { getRefreshToken, setIdToken, setRefreshToken } from './tokenUtils'
import { MESSAGES } from './consts'
const config = {
  clientId: '7dd575b5-bd13-486f-adaa-047a664bd355',
  redirectUrl: 'milaai.auth://oauthredirect/',
  additionalParameters: {},
  issuer: 'https://milaaisignin.b2clogin.com/15f24d55-d779-4709-a421-5a8006d76e14/v2.0/',
  scopes: [
    'openid',
    'offline_access',
    'https://milaaisignin.onmicrosoft.com/tasks-api/tasks.write',
    'https://milaaisignin.onmicrosoft.com/tasks-api/tasks.read'
  ],
  serviceConfiguration: {
    authorizationEndpoint:
      'https://milaaisignin.b2clogin.com/milaaisignin.onmicrosoft.com/b2c_1_milaauth/oauth2/v2.0/authorize',
    tokenEndpoint:
      'https://milaaisignin.b2clogin.com/milaaisignin.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1_milaauth'
  }
}
export const getAuthToken = async () => {
  try {
    const authInfo = await authorize({
      ...config,
      connectionTimeoutSeconds: 5000,
      iosPrefersEphemeralSession: true
    })
    console.log('id token', authInfo.idToken)
    if (authInfo?.idToken) {
      setIdToken(authInfo.idToken)
      setRefreshToken(authInfo.refreshToken)
      return authInfo
    } else {
      throw new Error('No id token')
    }
  } catch (error) {
    console.log('error at getauthtoken', error)
  }
}

export const getAuthTokenByRefreshToken = async () => {
  try {
    const refreshToken = getRefreshToken()
    const authInfo = await refresh(config, {
      refreshToken: refreshToken
    })
    setIdToken(authInfo?.idToken)
    setRefreshToken(authInfo?.refreshToken)
    return authInfo
  } catch (error) {
    // log out
    throw new Error(MESSAGES.TOEN_ERROR)
  }
}
