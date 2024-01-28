import {
  View,
  Text,
  Button,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFirstChat } from "../hooks/queries";
import { Thread } from "../components/organisms/Thread";
import { AskFrom } from "../components/organisms/AskFrom";
import TrackPlayer from "react-native-track-player";
import { PlayAudio } from "../assets/icons/PlayAudio";
import { useEffect, useState } from "react";
import { usePostMessage } from "../hooks/mutations";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
const difficulty = 1;

const SectionsScreen = ({ route }) => {
  const { section } = route.params;
  let { data: firstChat, isSuccess } = useFirstChat(difficulty, section?.id);
  let [chatThreads, setChatThread] = useState<Partial<MessageBack>[]>([]);
  const [userResponseMsg, setUserResponseMsg] = useState("");
  const mutation = usePostMessage();
  const onEndConversation = () => {};
  const ref = React.useRef(null);

  const scrollToBottom = () => {
    ref.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    if (isSuccess && firstChat && chatThreads.length === 0) {
      setChatThread(x => [...x, firstChat]);
    }
  }, [firstChat, isSuccess]);

  const handleSendButtonPress = async () => {
    setChatThread(chatThreads => [
      ...chatThreads,
      {
        type: "user",
        message: userResponseMsg,
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
      textInputValue: userResponseMsg,
      sectionId: section?.id,
    });
    setChatThread(x => [...x, data]);
    scrollToBottom();
  };

  return (
    <View className="flex-1 bg-gray-950 justify-between">
      <ScrollView ref={ref} className="flex flex-col gap-2 p-4 thread min-w-[330px] relative transition-all duration-1000 bg-slate-500 thread-bot dark:bg-mila-gray-100">
        {chatThreads.map(res => (
          <Thread
            thread={res}
            sectionId={section?.id}
            difficulty={difficulty}
          />
        ))}
      </ScrollView>

      <View className="flex flex-row justify-between mr-2 ml-2 align-middle bg-red-400">
        <View className="w-[80%]">
          <TextInput
            onChangeText={text => setUserResponseMsg(text)}
            className="border border-slate-200 rounded-2xl text-base h-14 font-medium outline-none  p-4"
            placeholder="Type something ..."
          />
        </View>
        <View className="flex flex-row gap-1 align-baseline">
          <TouchableOpacity onPress={handleSendButtonPress}className="self-center">
            <Icon name="send" size={30} color="#900" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendButtonPress} className={"self-center"}>

            <Icon name="settings-voice" size={30} color="#900" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <AskFrom onEndConversation={onEndConversation} /> */}
    </View>
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
