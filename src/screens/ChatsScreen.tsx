import { View, Text, Pressable, ScrollView } from "react-native";
import { useGetUserChats } from "../hooks/queries";
import React, { Suspense } from "react";
import { AskFrom } from "../components/organisms/AskFrom";

const ChatsScreen = ({ navigation }) => {
  const { data, isPending } = useGetUserChats();


  return (
    <ScrollView>
      <Suspense fallback={<div>Loading...</div>}>
      <Text>Chats screen Title</Text>
      {data?.sections?.map((section: Section, index: number) => (
        <Pressable
          onPress={() => {
            navigation.push("Section", { section });
          }}
        >
          <Text>{section?.title}</Text>
        </Pressable>
      ))}
      </Suspense>
    </ScrollView>
  );
};

export default ChatsScreen;
