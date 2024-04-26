import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { MERCHANT_ID, PUBLISHABLE_KEY, MESSAGES } from './../utils/consts'
import { t } from 'i18next'
import MButton from './atoms/MButton'
import { SetupParams } from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet'
import useSnackBar from '../hooks/useSnackBar'
import { useStripeSubscription } from '../hooks/queries'
import { useCancelStripeSubscription, useReactivateStripeSubscription } from '../hooks/mutations'

const StripeSubscription = ({ priceId }: { priceId: string }) => {
  const [ready, setReady] = useState(false)
  const { showSnackBar } = useSnackBar()
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()
  const { data } = useStripeSubscription({ priceId })

  useEffect(() => {
    if (data?.customer_id) {
      console.log('inside setup intent', data?.payment_intent)
      initialisePaymentSheet()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.customer_id])

  const initialisePaymentSheet = async () => {
    // const { setupIntent, ephemeralKey, customer } = await fetchPaymentSheetParams()
    const setUpParams: SetupParams = {
      primaryButtonLabel: 'Subscribe',
      customerId: data?.customer_id,
      customerEphemeralKeySecret: data?.ephemeral_key,
      setupIntentClientSecret: data?.setup_intent,
      paymentIntentClientSecret: data?.payment_intent,
      merchantDisplayName: 'Mai AI',
      allowsDelayedPaymentMethods: true,
      returnURL: 'Maiai://stripe-redirect'
    }
    const { error } = await initPaymentSheet(setUpParams)
    if (error) {
      showSnackBar({ text: `Error code: ${error.code} ${error.message}` })
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
      <StripeProvider publishableKey={PUBLISHABLE_KEY} merchantIdentifier={MERCHANT_ID}>
        <MButton className=" text-lg" onPress={handleSubscription}>
          {t('subscription.unlock-premium')}
        </MButton>
      </StripeProvider>
    </View>
  )
}

export default StripeSubscription
