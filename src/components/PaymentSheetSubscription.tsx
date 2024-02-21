import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { MERCHANT_ID, API_URL, PUBLISHABLE_kEY, MESSAGES } from './../utils/consts'
import { t } from 'i18next'
import MButton from './atoms/MButton'
import { SetupParams } from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet'
import useSnackBar from '../hooks/useSnackBar'
import { useStripeSubscription } from '../hooks/queries'

const StripeSubscription = ({ priceId }: { priceId: string }) => {
  const [ready, setReady] = useState(false)
  const { showSnackBar } = useSnackBar()
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()
  const { data } = useStripeSubscription({ priceId })

  useEffect(() => {
    if (data?.customer) {
      console.log('inside setup intent', data?.paymentIntent)
      initialisePaymentSheet()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.customer])

  const initialisePaymentSheet = async () => {
    // const { setupIntent, ephemeralKey, customer } = await fetchPaymentSheetParams()
    const setUpParams: SetupParams = {
      primaryButtonLabel: 'Subscribe',
      customerId: data?.customer,
      customerEphemeralKeySecret: data?.ephemeralKey,
      setupIntentClientSecret: data?.paymentIntent,
      merchantDisplayName: 'Mila AI',
      allowsDelayedPaymentMethods: true,
      returnURL: 'milaai://stripe-redirect'
    }
    console.log('inside init payment sheet...........', setUpParams)
    const { error } = await initPaymentSheet(setUpParams)
    if (error) {
      showSnackBar({ text: `Error code: ${error.code} ${error.message}` })
      console.log('error initializing..................', error)
    } else {
      setReady(true)
    }
  }

  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch(`${API_URL}/payment-sheet-subscription`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   const { setupIntent, ephemeralKey, customer } = await response.json()

  //   return {
  //     setupIntent,
  //     ephemeralKey,
  //     customer
  //   }
  // }

  const handleSubscription = async () => {
    console.log('pressed subscribe')
    const { error } = await presentPaymentSheet({})
    if (error) {
      console.log('error', error)
      showSnackBar({ text: `Error code: ${error.code} error.message` })
    } else {
      showSnackBar({
        text: MESSAGES.SUBSCRIPTION_SUCCESS
      })
      setReady(false)
    }
  }

  return (
    <View>
      <StripeProvider publishableKey={PUBLISHABLE_kEY} merchantIdentifier={MERCHANT_ID}>
        <MButton
          className="py-4 text-lg"
          text={t('subscription.unlock-premium')}
          onPress={handleSubscription}
          // disabled={loading || !ready}
        />
      </StripeProvider>
    </View>
  )
}

export default StripeSubscription
