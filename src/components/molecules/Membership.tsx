import { Button, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useMembership } from '../../hooks/useMembership'
import PremiumCancelMila from './../../assets/images/mila/premium-cancel-mila.png'
import dayjs from 'dayjs'
import Mila from './../../assets/images/mila/premium-mila.png'
import { FC, useState } from 'react'
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

const useHeaderDesc = () => {
  const [user] = useAuthStore(state => [state.user, state.setUser])
  const { isFreeUser, isCancelScheduled, isFreeTrial } = useMembership()
  const [currentPlan, setCurrentPlan] = useState(PLANS[0])
  const expireDate = dayjs(new Date(user?.plan_expired_on)).format('MMM D, YYYY')

  const premiumHeaderDesc = isFreeUser
    ? t('subscription.say-goodbye-to-limited-ai')
    : isFreeTrial
      ? t('subscription.subscription-will-expire-on', { date: expireDate })
      : isCancelScheduled
        ? t('subscription.subscription-will-expire-on', { date: expireDate })
        : t('subscription.thanks-for-support')

  const headerTitle = currentPlan
    ? 'Mila Premium'
    : isFreeTrial
      ? 'Mila Premium(Free Trial)'
      : 'Mila Starter'
  const image = isCancelScheduled ? PremiumCancelMila : Mila
  const currentPlanTitle = currentPlan
    ? currentPlan.title
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
  const { premiumHeaderDesc, headerTitle, image, currentPlanTitle } = useHeaderDesc()
  const [user] = useAuthStore(state => [state.user, state.setUser])
  const {
    isFreeUser,
    isCancelScheduled,
    isFreeTrial,
    shouldShowCancelSubscription,
    shouldShowReactivation
  } = useMembership()
  const [selectedPriceId, setSelectedPriceId] = useState(user?.stripe_price_id)
  const expireDate = dayjs(new Date(user?.plan_expired_on)).format('MMM D, YYYY')

  const onCancelSubscription = () => {
    console.log('cancel pressed')
  }
  const onReactivateSubscription = () => {
    console.log('reactivate pressed')
  }
  return (
    <ScrollView>
      <MScreenView>
        <View className="flex flex-row flex-1 flex-wrap  p-2  bg-slate-50  shadow-[0_1px_2px_0_rgba(2,6,23,0.30)] rounded-2xl">
          <View>
            <Image source={image} />
          </View>
          <View>
            <MText className="text-texttitle  font-semibold text-2xl">{headerTitle}</MText>
            <MText className="mt-2 text-xl font-medium text-texttitle">{premiumHeaderDesc}</MText>
          </View>
        </View>
        <MSubSection className="mt-4 ">
          <MSubTitle className={''} title={t('subscription.premium-benefits')} />
          <View className="flex gap-2 mt-2">
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
        <MSection>
          <MSubTitle title={t('subscription.manage-subscription')} />
          <View className="flex flex-row justify-between items-center">
            <View className="min-w-[150px]">
              <View className="bg-green-50 text-green-700 dark:bg-mila-gray-25 text-sm font-medium border border-green-200 rounded-2xl px-3 py-1 w-fit h-fit whitespace-nowrap">
                <MText> {t('subscription.current-plan')}</MText>
              </View>
            </View>
            <MText className="text-slate-800 font-semibold">{currentPlanTitle}</MText>
          </View>
        </MSection>
        <View className="flex  gap-6">
          <View className="min-w-[150px]" />

          {shouldShowCancelSubscription && (
            <Pressable
              className="text-blue-700 hover:text-blue-500 active:text-blue-700 disabled:text-blue-100 flex gap-1 font-semibold"
              disabled={isCancelling}
              onClick={() => onCancelSubscription()}>
              {isCancelling && <MSpinner />}
              <MText> {t('subscription.cancel-subscription')}</MText>
            </Pressable>
          )}
          {shouldShowReactivation && (
            <Pressable
              className="text-blue-700 hover:text-blue-500 active:text-blue-700 disabled:text-blue-100 flex gap-1 font-semibold"
              disabled={isReactivating}
              onClick={() => onReactivateSubscription()}>
              {isReactivating && <Spinner />}
              <MText>{t('subscription.reactivate-subscription')}</MText>
            </Pressable>
          )}
        </View>

        {!isFreeUser && (
          <View className="flex flex-row items-center gap-6 mt-4">
            <View className="min-w-[150px]">
              <View className="bg-green-50 text-green-700 dark:bg-mila-gray-25 dark:text-white dark:border-none text-sm font-medium border border-green-200 rounded-2xl px-3 py-1 w-fit h-fit whitespace-nowrap">
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
        'rounded-xl p-4  cursor-pointer bg-background shadow-shadow ',
        active && 'bg-primary'
      )}
      onPress={onClick}>
      <View className=" flex flex-row">
        <View>{icon}</View>
        <View className="px-2 flex-1">
          <View className="flex  flex-row justify-between ">
            <MText className="text-textprimary text-lg  ">{title}</MText>
            <View className="flex items-center gap-2 ">
              <MText className="text-slate-600 text-sm dark:text-white">{price}</MText>
            </View>
          </View>
          <View className="flex gap-1 flex-row">
            <MText className="text-slate-600 dark:text-white mt-2">{priceDescription}</MText>
            {bestDeal && (
              <View className="bg-green-50 border border-green-200 shadow-sm rounded-2xl px-3 py-1">
                <MText className="text-green-900 font-medium text-sm">
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
