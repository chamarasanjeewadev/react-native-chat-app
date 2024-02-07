import React, { FC, JSX } from 'react'
import { View } from 'react-native'
import { MLabelText } from '../atoms/MText'

interface FeatureCardProps {
  icon: JSX.Element
  title: string
  description: string
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => (
  <View className="flex flex-row items-center gap-2  rounded-2xl bg-background px-2 py-6 align-middle shadow-[0_1px_2px_0_rgba(2,6,23,0.30)]">
    <View className="">{icon}</View>
    <View className="flex flex-1  gap-1 overflow-hidden">
      <MLabelText className="text-lg font-semibold  dark:text-white">{title}</MLabelText>
      <MLabelText className="text-sm   dark:text-white ">{description}</MLabelText>
    </View>
  </View>
)

export { FeatureCard }
