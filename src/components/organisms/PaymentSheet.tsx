import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import MButton from '../atoms/MButton'
import { API_URL, MERCHANT_ID, MESSAGES, PUBLISHABLE_kEY } from '../../utils/consts'
import Snackbar from 'react-native-snackbar'

const PaymentSheet = () => {
  const [ready, setReady] = useState(false)
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()

  useEffect(() => {
    initialisePaymentSheet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initialisePaymentSheet = async () => {
    const { paymentIntent } = await fetchPaymentSheetParams()
    console.log('initializing payment sheet', paymentIntent)
    const { error } = await initPaymentSheet({
      // appearance: {
      //   colors: {
      //     primary: '#e06c75',
      //     background: '#282c34',
      //     componentBackground: '#abb2bf',
      //     componentDivider: '#e5c07b',
      //     primaryText: '#61afef',
      //     secondaryText: '#c678dd',
      //     componentText: '#282c34',
      //     icon: '#e06c75',
      //     placeholderText: '#ffffff'
      //   },
      //   shapes: {
      //     borderRadius: 25
      //   }
      // },
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Mila AI',
      // applePay: {
      //   merchantCountryCode: 'US'
      // },
      // googlePay: {
      //   merchantCountryCode: 'US',
      //   testEnv: true,
      //   currencyCode: 'usd'
      // },
      allowsDelayedPaymentMethods: true,
      returnURL: 'milaai://stripe-redirect'
    })
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      setReady(true)
    }
  }

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { paymentIntent, ephemeralKey, customer } = await response.json()

    return {
      paymentIntent,
      ephemeralKey,
      customer
    }
  }

  async function buy() {
    console.log('press buy...')
    const { error } = await presentPaymentSheet()

    if (error) {
      Snackbar.show({ text: `Error code: ${error.code} error.message` })
    } else {
      Snackbar.show({
        text: MESSAGES.PAYMENT_SUCCESS,
        duration: Snackbar.LENGTH_LONG
      })
      setReady(false)
    }
  }

  return (
    <StripeProvider publishableKey={PUBLISHABLE_kEY} merchantIdentifier={MERCHANT_ID}>
      <MButton
        className="px-4 py-4 text-lg"
        buttonText={'Unlock premium'}
        onPress={buy}
        disabled={loading || !ready}
      />
    </StripeProvider>
  )
}

export default PaymentSheet
