import { Pressable, Text, View } from "react-native";
import {
  useContextTranslate,
  useFeedbackTranslate,
  useGetUsersQuery,
} from "../../hooks/queries";
import { BotWord } from "./BotWord";
import { LanguageEnum, ThreadType } from "../../utils/enums";
import classNames from "classnames";
import TrackPlayer from "react-native-track-player";
import { PlayAudio } from "../../assets/icons/PlayAudio";
import { TranslateIcon } from "../../assets/icons/TranslateIcon";
import { useState } from "react";
const showRomaji = true;
const japaneseNotation = "Furigana";
const chineseNotation = "Romaji";
export const Thread = ({ thread, sectionId }: any) => {
  const { data: tokens } = useContextTranslate(thread?.text_response);
  const { data: feedbackTranslate, refetch } = useFeedbackTranslate(
    thread?.text_response,
    1,
    sectionId,
    "3"
  );
  const [showTranslate, showToggleTranslate] = useState(false);
  const { data: user, isLoading, refetch: getUserInfo } = useGetUsersQuery();

  return (
    <>
      <View
        className={classNames(
          "flex flex-row",
          thread?.type === ThreadType.BOT ? "" : "justify-end"
        )}
      >
        {thread.type === "user" && (
          <View>
            <Text>{thread.message}</Text>
          </View>
        )}
        {tokens?.tokenization_response?.map(
          (
            {
              token,
              translation,
              furigana,
              audio,
              romanization,
              kanji_only_length,
              zhuyin,
              learned,
            },
            index
          ) => (
            <BotWord
              index={index}
              key={index}
              value={token.replace(/\s/g, "&nbsp;")}
              hasTranslation={!!translation}
              translation={translation}
              audio={audio}
              learned={learned}
              romanized_character={
                showRomaji
                  ? user.target_language === LanguageEnum.Japanese
                    ? japaneseNotation === "Furigana"
                      ? furigana
                      : romanization
                    : chineseNotation === "Romaji"
                    ? romanization
                    : zhuyin
                  : null
              }
              kanji_length={kanji_only_length || 0}
            />
          )
        )}
      </View>
      <View className="pr-10 flex flex-row gap-2">
        <Pressable
          onPress={async () => {
            const url = thread?.audio_response!;
            try {
              await TrackPlayer.reset();
              await TrackPlayer.add({
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
            showToggleTranslate(x => !x);
            refetch();
          }}
        >
          <TranslateIcon />
        </Pressable>
      </View>
      {feedbackTranslate && showTranslate && (
        <View className="mt-6 pt-10 px-4 pb-4 rounded-br-2xl rounded-bl-2xl bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-white">
          <Text>{feedbackTranslate?.translated_text}</Text>
        </View>
      )}
    </>
  );
};
