import { Button, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useMembership } from '../../hooks/useMembership'
import PremiumCancelMila from './../../assets/images/mila/premium-cancel-mila.png'
import dayjs from 'dayjs'
import Mila from './../../assets/images/mila/premium-mila.png'
import { FC, useEffect, useState } from 'react'
import { PLANS } from '../atoms/stripe'
import { t } from 'i18next'
import { useAuthStore } from '../../stores/AuthStore'
import {
  PremiumFeatureIcon1,
  PremiumFeatureIcon2,
  PremiumFeatureIcon3,
  PremiumFeatureIcon4
} from '../../assets/icons/SubscriptionIcons'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { MText } from '../atoms/MText'
import { FeatureCard } from './'
import StripeSubscription from '../PaymentSheetSubscription'
import { MScreenView } from '../atoms/MScreenView'
import { MSpinner } from '../atoms/MSpinner'
import { MSection, MSubSection } from '../atoms/MSection'
import { TextProps } from 'react-native-svg'

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
  const [user] = useAuthStore(state => [state.user, state.setUser])
  const { isFreeUser, isCancelScheduled, isFreeTrial } = useMembership()

  const [selectedPriceId, setSelectedPriceId] = useState(user?.stripe_price_id)
  const expireDate = dayjs(new Date(user?.plan_expired_on)).format('MMM D, YYYY')

  useEffect(() => {
    setCurrentPlan(PLANS.find(plan => plan?.id === user.stripe_price_id))
  }, [user.stripe_price_id])

  const onCancelSubscription = () => {
    console.log('cancel pressed')
  }
  const onReactivateSubscription = () => {
    console.log('reactivate pressed')
  }
  return (
    <ScrollView>
      <MScreenView>
        <View className="flex flex-1 flex-row flex-wrap  rounded-2xl  bg-slate-50  p-2 shadow-[0_1px_2px_0_rgba(2,6,23,0.30)]">
          <View>
            <Image source={image} />
          </View>
          <View>
            <MText className="text-2xl  font-semibold text-texttitle">{headerTitle}</MText>
            <MText className="mt-2 text-xl font-medium text-texttitle">{premiumHeaderDesc}</MText>
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
            <MText className="my-6 px-4 text-2xl font-semibold text-textprimary">
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
            <StripeSubscription />
          </>
        )}
        {/* subscriptions info */}
        <MSection>
          <MSubTitle title={t('subscription.manage-subscription')} />
          <View className="flex flex-row items-center justify-between">
            <View className="">
              <View className="dark:bg-mila-gray-25 h-fit w-fit whitespace-nowrap rounded-2xl border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                <MText> {t('subscription.current-plan')}</MText>
              </View>
            </View>
            <MText className="font-semibold text-slate-800">{currentPlanTitle}</MText>
          </View>
          {!isFreeUser && !isCancelScheduled && !isFreeTrial && (
            <TouchableOpacity
              className="flex gap-1 text-sm font-semibold text-blue-700 hover:text-blue-500 active:text-blue-700 disabled:text-blue-100"
              disabled={isCancelling}
              onPress={() => onCancelSubscription()}>
              {isCancelling && <MSpinner />}
              <MText className="text-blue-500"> {t('subscription.cancel-subscription')}</MText>
            </TouchableOpacity>
          )}
          {isCancelScheduled && (
            <TouchableOpacity
              className="flex gap-1 text-sm font-semibold "
              disabled={isReactivating}
              onPress={() => onReactivateSubscription()}>
              {isReactivating && <MSpinner />}
              <MText className="text-blue-500">{t('subscription.reactivate-subscription')}</MText>
            </TouchableOpacity>
          )}
        </MSection>

        {!isFreeUser && (
          <View className="mt-4 flex flex-1 flex-row flex-wrap items-center gap-2">
            <View className="min-w-[150px]">
              <View className="dark:bg-mila-gray-25 h-fit w-fit whitespace-nowrap rounded-2xl border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700 dark:border-none dark:text-white">
                <MText> {t('subscription.next-payment')}</MText>
              </View>
            </View>
            <View className="text-sm text-slate-800 dark:text-white">
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
        'cursor-pointer rounded-xl  bg-background bg-slate-50 p-4 shadow-shadow ',
        active && 'bg-primary'
      )}
      onPress={onClick}>
      <View className=" flex flex-row">
        <View>{icon}</View>
        <View className="flex-1 px-2">
          <View className="flex  flex-row justify-between ">
            <MText className="text-lg text-textprimary  ">{title}</MText>
            <View className="flex items-center gap-2 ">
              <MText className="text-sm text-slate-600 dark:text-white">{price}</MText>
            </View>
          </View>
          <View className="flex flex-row gap-1">
            <MText className="mt-2 text-slate-600 dark:text-white">{priceDescription}</MText>
            {bestDeal && (
              <View className="rounded-2xl border border-green-200 bg-green-50 px-3 py-1 shadow-sm">
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
