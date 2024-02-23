import { View } from 'react-native'
import { MText } from '../atoms/MText'
import SVGPremium from './../../assets/icons/svgs/subscription.svg'
import SVGPremium2 from './../../assets/icons/svgs/subscription2.svg'
import MButton from '../atoms/MButton'
import { MScreenView } from '../atoms/MScreenView'

export const SubscriptionAlert = () => {
  return (
    <MScreenView>
      <View className="items-center ">
        <View className="item-center">
          <MText className="text-center font-normal text-coreprune" size="medium">
            LIMITED TIME OFFER
          </MText>
          <MText className="size-large font-extrabold text-coreprune">SAVE 50%</MText>
          <MText className="font-normal text-coreprune" size="small">
            On Mila Premium
          </MText>
        </View>
        <View className="mb-4 mt-4 items-center  text-center">
          <SVGPremium />
          <MText className="mt-2 font-extrabold italic text-coreprune " size="xl">
            FOR FIRST 100 STUDENTS ONLY
          </MText>
          <MText className=" font-extrabold italic text-coreprune" size="xl">
            DON’T MISS OUT!
          </MText>
        </View>
      </View>
      <View className="rounded-2xl bg-coreprune p-4">
        <View className="absolute -top-14">
          <SVGPremium2 />
        </View>
        <View className="radius-2xl absolute mb-2 rounded-br-2xl rounded-tl-2xl bg-coreplum p-2 text-white">
          <MText className="text-white">Limited Time Only!</MText>
        </View>
        <View className="mt-4 flex-row justify-between">
          <MText className="text-white">Annual Plan </MText>
          <View className="flex-row gap-2">
            <MText className="text-white">£120</MText>
            <MText className="text-white">£60</MText>
          </View>
        </View>
        <MText className="text-white">(50% off)</MText>
        <View className="flex-row justify-between">
          <MText className="text-white">Billed once a year</MText>
          <MText className="text-white">(£5/month)</MText>
        </View>
        <View className=" text-white">
          <MText className="font-semibold text-white">Benefits:</MText>
          <MText className="font-normal text-white">Unlimited AI Conversations</MText>
          <MText className="font-normal text-white">Interactive Pronunciation Practice</MText>
          <MText className="font-normal text-white">AI Tutor Grammar</MText>
        </View>
      </View>
      <Plan
        plan="Semi-Annual Plan"
        price={'£75'}
        description="Billed every month"
        breakdown="(£15/month)"
      />

      <Plan
        plan="Monthly Plan"
        price={'£15'}
        description="Billed every 6 months"
        breakdown="(£12.50/month)"
      />
      <View className="gap-2">
        <MButton className="bg-coreprune" text="whiteText">
          Subscribe and save 50%
        </MButton>
        <MButton className="bg-coreprune" text="whiteText">
          Continue without Saving
        </MButton>
        <MText className="text-center">Subscriptions can be cancelled anytime.</MText>
      </View>
    </MScreenView>
  )
}

export const Plan = ({
  plan,
  price,
  description,
  breakdown
}: {
  plan?: string
  price?: string
  description?: string
  breakdown?: string
}) => {
  return (
    <View className="m-2 flex-row justify-between rounded-2xl bg-corefig p-2">
      <View>
        <MText>{plan}</MText>
        <MText>{price}</MText>
      </View>
      <View className="align-right">
        <MText>{description} </MText>
        <MText className="text-left text-sm">{breakdown}</MText>
      </View>
    </View>
  )
}
