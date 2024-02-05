import { useAuthStore } from '../stores/AuthStore'
import { FREE_TRIAL } from '../utils/consts'

export const useMembership = () => {
  const [user] = useAuthStore(state => [state.user])
  // const { toasts } = useToasterStore()

  const isFreeUser = () => {
    return user && user.stripe_price_id === null
  }

  const isCancelScheduled = () => {
    return user && user.is_cancel_scheduled
  }

  const isFreeTrial = () => {
    return user && user.stripe_price_id === FREE_TRIAL
  }

  const showMembershipError = (dailyLimitReached?: boolean) => {
    // if (toasts.length >= 1) return
    // toast.custom(t => <MembershipToast {...t} dailyLimitReached={dailyLimitReached} />, {
    //   duration: 10000
    // })
  }

  return {
    showMembershipError,
    isFreeUser,
    isCancelScheduled,
    isFreeTrial
  }
}
