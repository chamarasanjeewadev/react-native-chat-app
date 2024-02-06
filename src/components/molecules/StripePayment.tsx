import { useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { Button, View } from 'react-native'

const CheckoutScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
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

  const initializePaymentSheet = async () => {
    const { setupIntent, ephemeralKey, customer } = await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent
    })
    if (!error) {
      setLoading(true)
    }
  }

  const openPaymentSheet = async () => {
    // see below
  }

  useEffect(() => {
    initializePaymentSheet()
  }, [])

  return (
    <View>
      <Button disabled={!loading} title="Set up" onPress={openPaymentSheet} />
    </View>
  )
}
export default CheckoutScreen
