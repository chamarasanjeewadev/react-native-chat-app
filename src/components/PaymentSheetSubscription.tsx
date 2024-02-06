import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { Button, Image, Text, View, Alert, StyleSheet } from 'react-native'
import { MERCHANT_ID, API_URL, PUBLISHABLE_kEY } from './../utils/consts'
import { t } from 'i18next'
import Snackbar from 'react-native-snackbar'
import MButton from './atoms/MButton'

const StripeSubscription = ({}) => {
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
      Alert.alert(`Error code: ${error.code}`, error.message)
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

  async function handleSubscription() {
    console.log("handle subscription pressed")
    const { error } = await presentPaymentSheet()

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      Snackbar.show({
        text: 'The subscription was setup successfully',
        duration: Snackbar.LENGTH_LONG
      })
      setReady(false)
    }
  }

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 100
  },
  image: {
    height: 250,
    width: 250
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%'
  }
})
