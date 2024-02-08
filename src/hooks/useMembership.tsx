import { useAuthStore } from '../stores/AuthStore'
import { FREE_TRIAL } from '../utils/consts'

export const useMembership = () => {
  const [user] = useAuthStore(state => [state.user])

  const isFreeUser = !user?.stripe_price_id
  const isCancelScheduled = !!user?.is_cancel_scheduled
  const isFreeTrial = !!(user?.stripe_price_id === FREE_TRIAL)

  const shouldShowCancelSubscription = !isFreeUser && !isCancelScheduled && !isFreeTrial

  return {
    isFreeUser,
    isCancelScheduled,
    isFreeTrial,
    shouldShowCancelSubscription
  }
}
