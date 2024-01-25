import { View, Text, Button } from "react-native";
import { useFirstChat } from "../hooks/queries";
import { Thread } from "../components/organisms/Thread";
import { AskFrom } from "../components/organisms/AskFrom";

const SectionsScreen = ({ route, navigation }) => {
  const { section } = route.params;
  const { data, isPending, error } = useFirstChat(1, section?.id);
  console.log("section", section);
  {
    isPending && <View>loading....</View>;
  }
  const onEndConversation = () => {
  };

  return (
    <>
      <View className="mt-8 mb-8 px-20 bg-blend-color-dodge">
        <Text>{section.title}</Text>
      </View>
      <View className="flex flex-col gap-2 p-4 thread min-w-[330px] relative transition-all duration-1000 bg-slate-100 thread-bot dark:bg-mila-gray-100">
        <Thread thread={data} />
      </View>
      <AskFrom onEndConversation={onEndConversation} />
    </>
  );
};

SectionsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Details',
  headerLeft: () => (
    <Button
      onPress={() => navigation.goBack()}
      title="Back"
      color="#007AFF" // You can customize the color
    />
  ),
});
export default SectionsScreen;
