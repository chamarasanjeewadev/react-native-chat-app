import { Button, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useMembership } from '../../hooks/useMembership'
import PremiumCancelMila from './../../assets/images/mila/premium-cancel-mila.png'
import dayjs from 'dayjs'
import Mila from './../../assets/images/mila/premium-mila.png'
import { FC, useEffect, useState } from 'react'
import { PLANS } from '../atoms/stripe'
import { t } from 'i18next'
import { useAuthStore } from '../../stores/AuthStore'
import PremiumFeatureIcon1 from '../../assets/icons/svgs/premiumFeatureIcon1.svg'
import PremiumFeatureIcon2 from '../../assets/icons/svgs/premiumFeatureIcon2.svg'
import PremiumFeatureIcon3 from '../../assets/icons/svgs/premiumFeatureIcon3.svg'
import PremiumFeatureIcon4 from '../../assets/icons/svgs/premiumFeatureIcon4.svg'
// import {
//   PremiumFeatureIcon1,
//   PremiumFeatureIcon2,
//   PremiumFeatureIcon3,
//   PremiumFeatureIcon4
// } from '../../assets/icons/SubscriptionIcons'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { FeatureCard } from './'
import StripeSubscription from '../PaymentSheetSubscription'
import { MScreenView } from '../atoms/MScreenView'
import { MSpinner } from '../atoms/MSpinner'
import { MSection, MSubSection } from '../atoms/MSection'
import { TextProps } from 'react-native-svg'
import PaymentSheet from '../organisms/PaymentSheet'
import MButton from '../atoms/MButton'
import { MText } from '../atoms/MText'
import PaymentSheetSubscription from '../PaymentSheetSubscription'
import { useCancelStripeSubscription, useReactivateStripeSubscription } from '../../hooks/mutations'
import { useGetUsersQuery } from '../../hooks/queries'

const useHeaderDesc = ({ currentPlan }: { currentPlan: typeof PLANS }) => {
  const [user] = useAuthStore(state => [state.user, state.setUser])
  const { isFreeUser, isCancelScheduled, isFreeTrial } = useMembership()
  const expireDate = dayjs(new Date(user?.plan_expired_on)).format('MMM D, YYYY')

  const premiumHeaderDesc = isFreeUser
    ? t('subscription.say-goodbye-to-limited-ai')
    : isFreeTrial
      ? t('subscription.subscription-will-expire-on', { date: expireDate })
      : isCancelScheduled
        ? t('subscription.subscription-will-expire-on', { date: expireDate })
        : t('subscription.thanks-for-support')

  const headerTitle =
    currentPlan || {} ? 'Mila Premium' : isFreeTrial ? 'Mila Premium(Free Trial)' : 'Mila Starter'
  const image = isCancelScheduled ? PremiumCancelMila : Mila
  const currentPlanTitle = currentPlan
    ? currentPlan?.title
    : isFreeTrial
      ? 'Mila Premium(Free Trial)'
      : 'Mila Starter'

  return {
    currentPlanTitle,
    premiumHeaderDesc,
    headerTitle,
    image
  }
}

export const MSubTitle = ({ title }: { title: string } & TextProps) => {
  return <MText className="text-2xl font-semibold text-blue-950 dark:text-white">{title}</MText>
}

export const Membership = () => {
  const [isReactivating, setReactivating] = useState(false)
  const [isCancelling, setCancelling] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(PLANS[0])
  const { premiumHeaderDesc, headerTitle, image, currentPlanTitle } = useHeaderDesc({ currentPlan })
  const { refetch } = useGetUsersQuery()
  const [user, setUser] = useAuthStore(state => [state.user, state.setUser])
  const { isFreeUser, isCancelScheduled, isFreeTrial } = useMembership()
  const { mutate: cancelSubscription } = useCancelStripeSubscription()
  const { mutate: reactivateSubscription } = useReactivateStripeSubscription()

  const [selectedPriceId, setSelectedPriceId] = useState(user?.stripe_price_id)
  const expireDate = dayjs(new Date(user?.plan_expired_on)).format('MMM D, YYYY')

  console.log('is cancel scheduled', isCancelScheduled)
  useEffect(() => {
    setCurrentPlan(PLANS.find(plan => plan?.id === user.stripe_price_id))
  }, [user.stripe_price_id])

  const onCancelSubscription = async () => {
    await cancelSubscription()
    await refetch().then(data => {
      setUser({ ...user, ...data?.data })
    })
  }
  const onReactivateSubscription = async () => {
    await reactivateSubscription()
    await refetch().then(data => {
      console.log('data on refetch', { ...user, ...data?.data })
      setUser({ ...user, ...data?.data })
    })
  }
  return (
    <ScrollView>
      <MScreenView>
        <View className="bg-slate-50 flex flex-1 flex-row  flex-wrap  rounded-2xl  p-2 shadow-[0_1px_2px_0_rgba(2,6,23,0.30)]">
          <View>
            <Image source={image} />
          </View>
          <View>
            <MText className="text-texttitle  text-2xl font-semibold">{headerTitle}</MText>
            <MText className="text-texttitle mt-2 text-xl font-medium">{premiumHeaderDesc}</MText>
          </View>
        </View>
        <MSubSection className="mt-4 ">
          <MSubTitle title={t('subscription.premium-benefits')} />
          <View className="mt-2 flex gap-2">
            <FeatureCard
              icon={<PremiumFeatureIcon1 />}
              title={t('subscription.unlimited-ai-conversations')}
              description={t('subscription.unlimited-ai-conversations.description')}
            />
            <FeatureCard
              icon={<PremiumFeatureIcon2 />}
              title={t('subscription.interactive-pronunciation-practice')}
              description={t('subscription.interactive-pronunciation-practice.description')}
            />
            <FeatureCard
              icon={<PremiumFeatureIcon3 />}
              title={t('subscription.contextual-language-support')}
              description={t('subscription.contextual-language-support.description')}
            />
            <FeatureCard
              icon={<PremiumFeatureIcon4 />}
              title={t('subscription.ai-tutor-grammar-review')}
              description={t('subscription.ai-tutor-grammar-review.description')}
            />
          </View>
        </MSubSection>
        {(isFreeUser || isFreeTrial) && (
          <>
            <MText className="text-textprimary my-6 px-4 text-2xl font-semibold">
              {t('subscription.find-best-subscription-plan')}
            </MText>
            <View className="flex flex-col gap-3">
              {PLANS.map(plan => (
                <MembershipItem
                  bestDeal={plan.bestDeal}
                  icon={plan.icon}
                  key={plan.id}
                  priceId={plan.id}
                  title={plan.title}
                  price={plan.price}
                  priceDescription={plan.priceDescription}
                  paymentLink={plan.paymentLink}
                  active={plan.id === selectedPriceId}
                  onClick={() => setSelectedPriceId(plan.id)}
                />
              ))}
            </View>
            <PaymentSheetSubscription priceId={selectedPriceId} />
          </>
        )}

        <MSection>
          <MSubTitle title={t('subscription.manage-subscription')} />
          <View className="flex flex-row items-center justify-between">
            <View className="">
              <View className="dark:bg-mila-gray-25 h-fit w-fit whitespace-nowrap rounded-2xl border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                <MText> {t('subscription.current-plan')}</MText>
              </View>
            </View>
            <MText className="text-slate-800 font-semibold">{currentPlanTitle}</MText>
          </View>
          {!isFreeUser && !isCancelScheduled && !isFreeTrial && (
            <MButton
              disabled={isCancelling}
              loading={isCancelling}
              onPress={() => onCancelSubscription()}>
              {t('subscription.cancel-subscription')}
            </MButton>
          )}
          {isCancelScheduled && (
            <MButton
              disabled={isReactivating}
              loading={isReactivating}
              onPress={() => onReactivateSubscription()}>
              {t('subscription.reactivate-subscription')}
            </MButton>
          )}
        </MSection>

        {!isFreeUser && (
          <View className="mt-4 flex flex-1 flex-row flex-wrap items-center gap-2">
            <View className="min-w-[150px]">
              <View className="dark:bg-mila-gray-25 h-fit w-fit whitespace-nowrap rounded-2xl border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700 dark:border-none dark:text-white">
                <MText> {t('subscription.next-payment')}</MText>
              </View>
            </View>
            <View className="text-slate-800 text-sm dark:text-white">
              <MText className="">
                {!isFreeTrial &&
                  (isCancelScheduled
                    ? t('subscription.will-expire-on', { date: expireDate })
                    : t('subscription.will-charged-on', {
                        date: expireDate,
                        price: currentPlan && currentPlan.priceValue * currentPlan.duration
                      }))}
              </MText>
              {isFreeTrial && t('subscription.trial-expire-on', { date: expireDate })}
            </View>
          </View>
        )}
      </MScreenView>
    </ScrollView>
  )
}

const MembershipItem: FC<MembershipItemProps> = ({
  bestDeal,
  icon,
  title,
  price,
  priceDescription,
  active,
  onClick
}) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity
      className={clsx(
        'bg-slate-50  rounded-xl bg-background p-4 shadow-shadow ',
        active && 'bg-primary'
      )}
      onPress={onClick}>
      <View className=" flex flex-row">
        <View>{icon}</View>
        <View className="flex-1 px-2">
          <View className="flex  flex-row justify-between ">
            <MText className="text-textprimary text-lg  ">{title}</MText>
            <View className="flex items-center gap-2 ">
              <MText className="text-slate-600 text-sm dark:text-white">{price}</MText>
            </View>
          </View>
          <View className="flex flex-row gap-1">
            <MText className="text-slate-600 mt-2 dark:text-white ">{priceDescription}</MText>
            {bestDeal && (
              <View className="rounded-2xl  border border-green-200 bg-green-50 px-3 py-1 shadow-sm">
                <MText className="text-sm font-medium text-green-900">
                  {t('subscription.best-deal')}
                </MText>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

interface MembershipItemProps {
  bestDeal: boolean
  icon: JSX.Element
  priceId: string
  title: string
  price: string
  priceDescription: string
  active: boolean
  paymentLink: string
  onClick: () => void
}
