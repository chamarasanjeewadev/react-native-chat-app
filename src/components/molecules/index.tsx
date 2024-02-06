import { FC, JSX } from 'react'
import { Text, View } from 'react-native'

interface FeatureCardProps {
  icon: JSX.Element
  title: string
  description: string
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => (
  <View className="bg-slate-50 dark:bg-mila-gray-25 shadow-[0_1px_2px_0_rgba(2,6,23,0.30)] flex gap-2 rounded-2xl p-6">
    <View className="min-w-[40px] min-h-[40px]">{icon}</View>
    <View className="flex flex-col gap-2">
      <Text className="text-lg font-semibold dark:text-white">{title}</Text>
      <Text className="text-sm font-medium dark:text-white">{description}</Text>
    </View>
  </View>
)

export { FeatureCard }
