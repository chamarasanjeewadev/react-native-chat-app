import { View, Text, Button, Pressable, TextInput } from "react-native";
import { useFirstChat } from "../hooks/queries";
import { Thread } from "../components/organisms/Thread";
import { AskFrom } from "../components/organisms/AskFrom";
import TrackPlayer from "react-native-track-player";
import { PlayAudio } from "../assets/icons/PlayAudio";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostMessage } from "../hooks/mutations";

const SectionsScreen = ({ route, navigation }) => {
  const { section } = route.params;
  let { data, isSuccess, error } = useFirstChat(1, section?.id);
  const client = useQueryClient();
  let [chatThreads, setChatThread] = useState([]);
  const [textInputValue, setTextInputValue] = useState("");
  const mutation = usePostMessage();
  const onEndConversation = () => {};

  useEffect(() => {
    console.log("inside use effect", data);
    if (isSuccess && data && chatThreads.length === 0) {
      console.log("inside use effect data", data);
      setChatThread(x => [...x, data]);
    }
  }, [data, isSuccess]);

  const handleSendButtonPress = async () => {
    setChatThread(chatThreads => [
      ...chatThreads,
      {
        type: "user",
        message: textInputValue,
        grammar: {
          corrected_text: {
            feedback: "",
            score: 0,
          },
        },
        lastAIMessage: chatThreads[chatThreads.length - 1].message,
      },
    ]);
    const data = await mutation.mutateAsync({
      textInputValue,
      sectionId: section?.id,
    });
    console.log("data after response...", data);
    setChatThread(x => [...x, data]);
  };

  const threadData = client.getQueriesData({ queryKey: ["chats"] });
  console.log("thread-data", threadData);
  return (
    <>
      <View className="mt-8 mb-8 px-20 bg-blend-color-dodge">
        <Text>{section.title}</Text>
      </View>
      <View className="flex flex-col gap-2 p-4 thread min-w-[330px] relative transition-all duration-1000 bg-slate-100 thread-bot dark:bg-mila-gray-100">
        {chatThreads.map(res => (
          <Thread thread={res} sectionId={section?.id} />
        ))}
      </View>
      <Pressable
        onPress={async () => {
          const url = data?.audio_response!;
          try {
            await TrackPlayer.reset();
            await TrackPlayer.add({
              id: 1,
              title: "Maan Meri Jaan",
              artist: "King",
              album: "Champagne Talk",
              artwork:
                "https://c.saavncdn.com/734/Champagne-Talk-Hindi-2022-20221008011951-500x500.jpg",
              url: url,
            });
            await TrackPlayer.play();
          } catch (error) {
            console.log("issue playing track", error);
          }
        }}
      >
        <PlayAudio />
      </Pressable>
      <Pressable
        onPress={async () => {
          try {
            console.log("just before stop track player");

            await TrackPlayer.pause();
          } catch (error) {
            console.log("issue playing track", error);
          }
        }}
      >
        <Text>stop Audio</Text>
      </Pressable>
      <View>
        <TextInput
          placeholder="Enter text here"
          value={textInputValue}
          onChangeText={text => setTextInputValue(text)}
        />
        <Button title="Send" onPress={handleSendButtonPress} />
      </View>
      <AskFrom onEndConversation={onEndConversation} />
    </>
  );
};

SectionsScreen.navigationOptions = ({ navigation }) => ({
  title: "Details",
  headerLeft: () => (
    <Button
      onPress={() => navigation.goBack()}
      title="Back"
      color="#007AFF" // You can customize the color
    />
  ),
});
export default SectionsScreen;
