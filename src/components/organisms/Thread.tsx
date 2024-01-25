import { Text, View } from "react-native";
import { useContextTranslate, useGetUsersQuery } from "../../hooks/queries";
import { BotWord } from "./BotWord";
import { LanguageEnum, ThreadType } from "../../utils/enums";
import classNames from "classnames";
//TODO change later
const showRomaji = true;
const japaneseNotation = "Furigana";
const chineseNotation = "Romaji";
export const Thread = ({ thread }: any) => {
  console.log("thread...", thread);
  const { data: tokens } = useContextTranslate(thread?.text_response);
  const { data: user, isLoading, refetch: getUserInfo } = useGetUsersQuery();
  console.log("token data....", tokens);
  return (
    <View
      className={classNames(
        "flex flex-row",
        thread?.type === ThreadType.BOT ? "" : "justify-end"
      )}
    >
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
  );
};
