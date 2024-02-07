import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { MERCHANT_ID, API_URL, PUBLISHABLE_kEY, MESSAGES } from './../utils/consts'
import { t } from 'i18next'
import Snackbar from 'react-native-snackbar'
import MButton from './atoms/MButton'

const StripeSubscription = () => {
  const [ready, setReady] = useState(false)
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()

  useEffect(() => {
    initialisePaymentSheet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initialisePaymentSheet = async () => {
    const { setupIntent, ephemeralKey, customer } = await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
      merchantDisplayName: 'Example Inc.',
      applePay: {
        merchantCountryCode: 'US'
      },
      googlePay: {
        merchantCountryCode: 'US',
        testEnv: true,
        currencyCode: 'usd'
      },
      allowsDelayedPaymentMethods: true,
      returnURL: 'milaai://stripe-redirect'
    })
    if (error) {
      Snackbar.show({ text: `Error code: ${error.code} ${error.message}` })
    } else {
      setReady(true)
    }
  }

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { setupIntent, ephemeralKey, customer } = await response.json()

    return {
      setupIntent,
      ephemeralKey,
      customer
    }
  }

  const handleSubscription = async () => {
    console.log('sub clickeed')
    const { error } = await presentPaymentSheet()
    if (error) {
      Snackbar.show({ title: `Error code: ${error.code} error.message` })
    } else {
      Snackbar.show({
        text: MESSAGES.SUBSCRIPTION_SUCCESS,
        duration: Snackbar.LENGTH_LONG
      })
      setReady(false)
    }
  }

  return (
    <View>
      <StripeProvider publishableKey={PUBLISHABLE_kEY} merchantIdentifier={MERCHANT_ID}>
        <MButton
          buttonText={t('subscription.unlock-premium')}
          onPress={handleSubscription}
          disabled={loading || !ready}
        />
      </StripeProvider>
    </View>
  )
}

export default StripeSubscription
