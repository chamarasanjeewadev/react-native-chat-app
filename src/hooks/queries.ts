import { contextTranslate, firstChat } from "../services/apiService";
import { useQuery } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getUserChats,
  getUserStats,
  sectionsCommunity,
  signIn,
} from "../services/apiService";

type State = "all" | "open" | "done";
type Todo = {
  id: number;
  state: State;
};

export const useGetUsersQuery = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: signIn,
  });

export const useGetUserChats = () =>
  useSuspenseQuery({
    queryKey: ["chats"],
    queryFn: getUserChats,
  });
export const useGetSectionsCommunity = () =>
  useQuery({
    queryKey: ["sections"],
    queryFn: sectionsCommunity,
  });
export const useGetUserStats = () =>
  useQuery({
    queryKey: ["stats"],
    queryFn: getUserStats,
  });
export const useFirstChat = (difficulty: number, id: string) =>
  useQuery({
    queryKey: ["sectionInfo", id],
    queryFn: firstChat,
  });

export const useContextTranslate = (text: string) =>
  useQuery({
    queryKey: ["translate", text],
    queryFn: contextTranslate,
  });
