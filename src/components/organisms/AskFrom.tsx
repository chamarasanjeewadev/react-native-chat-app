import { Text, TextInput, View } from "react-native";
import { Light } from "../../assets/icons/Light";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const isAIThinking = false;
const isConversationEnding = false;
export const AskFrom = ({ onEndConversation }) => {
  return (
    <View className="w-full flex gap-2">
      <View className="flex-1 flex shadow-sm p-2 rounded-2xl gap-2">
        <View className="flex-1 w-full">
          <TextInput
            type="text"
            className="border border-slate-200 rounded-2xl text-base h-12 font-medium outline-none w-full p-4"
            name="msg"
            placeholder="Type something ..."
            disabled={isAIThinking || isConversationEnding}
            // {...register("msg")}
          />
        </View>
        <View className="flex">
          {/* <IconButton
            icon={
              <MdSend
                className={classNames(
                  "w-6 h-6",
                  themeColor === "blue" ? "text-blue-900" : "",
                  themeColor === "orange" ? "text-orange-900" : "",
                  themeColor === "pink" ? "text-pink-900" : ""
                )}
              />
            }
            color="white"
            bgColor={themeColor}
            clickHandler={handleSubmit(data => {
              sendMsgHandler(JSON.stringify(data));
            })}
            type="submit"
            loading={isAIThinking}
            disabled={isAIThinking || isConversationEnding}
          /> */}
        </View>
        <View className="flex">
          {/* < MdSettingsVoice/> */}
          {/* <IconButton
            icon={
              <MdSettingsVoice
                className={classNames(
                  "w-6 h-6",
                  themeColor === "blue" ? "text-blue-900" : "",
                  themeColor === "orange" ? "text-orange-900" : "",
                  themeColor === "pink" ? "text-pink-900" : ""
                )}
              />
            }
            color="white"
            bgColor={themeColor}
            clickHandler={() => {
              //   setAskMode(AskMode.Audio);
            }}
          /> */}
        </View>
        <View className="flex">
          <Text>
            <Icon name="send" size={130} color="#900" />
          </Text>
          <Light />
          {/* <IconButton
            className="hint-button"
            icon={
              <span
                className={classNames(
                  themeColor === "blue" ? "text-blue-900" : "",
                  themeColor === "orange" ? "text-orange-900" : "",
                  themeColor === "pink" ? "text-pink-900" : ""
                )}
              >
                <Light />
              </span>
            }
            color="white"
            bgColor={themeColor}
            clickHandler={fetchHint}
            type="button"
            loading={isHintFetching}
            disabled={
              hint !== null ||
              difficulty !== StudyMode.CONVERSATION_EASY ||
              isHintFetching ||
              isConversationEnding
            }
          /> */}
        </View>
      </View>
    </View>
  );
};
