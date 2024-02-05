import { Button, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { useMembership } from '../../hooks/useMembership'
// import { PremiumCancelMila } from './../../assets/images/mila/premium-cancel-mila.png'
import dayjs from 'dayjs'
// import { Mila } from './../../assets/images/mila/premium-mila.png'
import { FC, useState } from 'react'
import { PLANS } from '../atoms/stripe'
import { t } from 'i18next'
import { useAuthStore } from '../../stores/AuthStore'
import FeatureCard from '.'
import {
  PremiumFeatureIcon1,
  PremiumFeatureIcon2,
  PremiumFeatureIcon3,
  PremiumFeatureIcon4
} from '../../assets/icons/SubscriptionIcons'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { MText } from '../atoms/MText'
export const Membership = () => {
  const [isSubscribing, setSubscribing] = useState(false)
  const [isReactivating, setReactivating] = useState(false)
  const [isCancelling, setCancelling] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(PLANS[0])
  const [user, setUser] = useAuthStore(state => [state.user, state.setUser])
  const { isFreeUser, isCancelScheduled, isFreeTrial } = useMembership()
  const [activeId, setActiveId] = useState(user?.stripe_price_id)
  const expireDate = dayjs(new Date(user?.plan_expired_on)).format('MMM D, YYYY')
  return (
    <ScrollView>
      <View>
        <View className="flex md:items-center p-4 gap-4 max-md:flex-col bg-slate-50 dark:bg-mila-gray-25 shadow-[0_1px_2px_0_rgba(2,6,23,0.30)] rounded-2xl">
          <View className="min-w-[131px]">
            {/* <Image source={isCancelScheduled() ? PremiumCancelMila : Mila} /> */}
          </View>
          <View>
            <MText className="text-blue-950 dark:text-white font-semibold text-2xl">
              {currentPlan
                ? 'Mila Premium'
                : isFreeTrial()
                  ? 'Mila Premium(Free Trial)'
                  : 'Mila Starter'}
            </MText>
            <MText className="mt-2 text-xl font-medium text-slate-800 dark:text-slate-100">
              {isFreeUser()
                ? t('subscription.say-goodbye-to-limited-ai')
                : isFreeTrial()
                  ? t('subscription.subscription-will-expire-on', { date: expireDate })
                  : isCancelScheduled()
                    ? t('subscription.subscription-will-expire-on', { date: expireDate })
                    : t('subscription.thanks-for-support')}
            </MText>
          </View>
        </View>
      </View>
      <MText className="my-6 px-4 text-2xl font-semibold text-blue-950 dark:text-white">
        {t('subscription.premium-benefits')}
      </MText>
      <View className="grid grid-cols-2 max-md:grid-cols-1 gap-2">
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
        {true && (
          <>
            <MText className="my-6 px-4 text-2xl font-semibold text-blue-950 dark:text-white">
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
                  active={plan.id === activeId}
                  onClick={() => setActiveId(plan.id)}
                />
              ))}
            </View>
          </>
        )}

        {true && (
          <View className="mt-4 w-full">
            <Button
              title={t('subscription.unlock-premium')}
              // width="fit-parent"
              color="blue"
              // disabled={!activeId || isSubscribing || activeId === FREE_TRIAL}
              // onClick={onSubscribe}
              // isLoading={isSubscribing}
            />
          </View>
        )}

        <MText className="my-6 px-4 text-2xl font-semibold text-blue-950 dark:text-white">
          {t('subscription.manage-subscription')}
        </MText>
        <View className="flex flex-row items-center gap-6">
          <View className="min-w-[150px]">
            <View className="bg-green-50 text-green-700 dark:bg-mila-gray-25 dark:text-white dark:border-none text-sm font-medium border border-green-200 rounded-2xl px-3 py-1 w-fit h-fit whitespace-nowrap">
              <MText> {t('subscription.current-plan')}</MText>
            </View>
          </View>
          <MText className="text-slate-800 font-semibold dark:text-white">
            {currentPlan
              ? currentPlan.title
              : isFreeTrial()
                ? 'Mila Premium(Free Trial)'
                : 'Mila Starter'}
          </MText>
        </View>

        <View className="flex  gap-6">
          <View className="min-w-[150px]" />

          {!isFreeUser() && !isCancelScheduled() && !isFreeTrial() && (
            <Pressable
              className="text-blue-700 hover:text-blue-500 active:text-blue-700 disabled:text-blue-100 flex gap-1 font-semibold"
              disabled={isCancelling}
              onClick={() => onCancelSubscription()}>
              {isCancelling && <Spinner />}
              <MText> {t('subscription.cancel-subscription')}</MText>
            </Pressable>
          )}
          {isCancelScheduled() && (
            <Pressable
              className="text-blue-700 hover:text-blue-500 active:text-blue-700 disabled:text-blue-100 flex gap-1 font-semibold"
              disabled={isReactivating}
              onClick={() => onReactivateSubscription()}>
              {isReactivating && <Spinner />}
              <MText>{t('subscription.reactivate-subscription')}</MText>
            </Pressable>
          )}
        </View>

        {!isFreeUser() && (
          <View className="flex flex-row items-center gap-6 mt-4">
            <View className="min-w-[150px]">
              <View className="bg-green-50 text-green-700 dark:bg-mila-gray-25 dark:text-white dark:border-none text-sm font-medium border border-green-200 rounded-2xl px-3 py-1 w-fit h-fit whitespace-nowrap">
                <MText> {t('subscription.next-payment')}</MText>
              </View>
            </View>
            <View className="text-slate-800 text-sm dark:text-white">
              <MText className="text-wrap">
                {!isFreeTrial() &&
                  (isCancelScheduled()
                    ? t('subscription.will-expire-on', { date: expireDate })
                    : t('subscription.will-charged-on', {
                        date: expireDate,
                        price: currentPlan && currentPlan.priceValue * currentPlan.duration
                      }))}
              </MText>
              {/* {isFreeTrial() && t('subscription.trial-expire-on', { date: expireDate })} */}
            </View>
          </View>
        )}
      </View>
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
    <View
      className={clsx(
        'rounded-xl p-4 flex gap-4 cursor-pointer',
        active
          ? 'shadow-[0_0_0_4px_#D1FAE5] dark:shadow-[0_0_0_4px_#020617]'
          : 'bg-slate-50 dark:bg-mila-gray-100 dark:text-white dark:border-blue-600'
      )}
      onClick={onClick}>
      {icon}
      <View className="flex flex-col text-sm flex-1">
        <View className="flex items-center justify-between">
          <MText className="text-slate-700 text-lg dark:text-white font-semibold">{title}</MText>
          <View className="flex items-center gap-2">
            {bestDeal && (
              <View className="bg-green-50 border border-green-200 shadow-sm rounded-2xl px-3 py-1">
                <MText className="text-green-900 font-medium text-sm">
                  {t('subscription.best-deal')}
                </MText>
              </View>
            )}
            <MText className="text-slate-600 text-sm dark:text-white">{price}</MText>
          </View>
        </View>
        <View className="flex gap-1">
          <MText className="text-slate-600 dark:text-white mt-2">{priceDescription}</MText>
        </View>
      </View>
    </View>
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
