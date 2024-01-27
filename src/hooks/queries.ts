import { translateQueryKeys, userQueryKeys } from './queryKeys/index';
import {
  contextTranslate,
  feedbackTranslate,
  firstChat,
} from "../services/apiService";
import { useQuery } from "@tanstack/react-query";
import {
  getMilaUserChats,
  signIn,
} from "../services/apiService";
import { queryKeys } from "./queryKeys";


export const useGetUsersQuery = () =>
  useQuery({
    queryKey: queryKeys.user.user.queryKey,
    queryFn: signIn,
  });

export const useGetMilaChats = () =>
  useQuery({
    queryKey: queryKeys.chats.milaChats().queryKey,
    queryFn: getMilaUserChats,
  });

export const useFirstChat = (difficulty: number, id: string) =>
  useQuery({
    queryKey:queryKeys.chats.chat(id).queryKey,
    queryFn: ()=>firstChat(difficulty,id),
  });

export const useContextTranslate = (text: string) =>
  useQuery({
    queryKey: queryKeys.translate.translateText(text).queryKey,
    queryFn: ()=>contextTranslate(text),
    enabled: !!text,
  });
export const useFeedbackTranslate = (
  text: string,
  difficulty: number,
  sectionId: string,
  id: number
) =>
  useQuery({
    queryKey: queryKeys.translate.feedbackText(text,sectionId,id).queryKey,
    queryFn:() =>  feedbackTranslate({
      text,
      difficulty_level: difficulty,
      sectionId,
      message_id: id,
    }),
    enabled: false,
  });
