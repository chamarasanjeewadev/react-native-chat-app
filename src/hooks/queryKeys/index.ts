import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const chatQueryKeys = createQueryKeys("chats", {
  detail: (id: string) => [id],
  milaChats: () => ({
    queryKey: ["milachats"],
  }),
  chat: (id: string) => ({
    queryKey: [id],
  }),
  sections: (id: string) => ({
    queryKey: [id],
  }),
});

export const authQueryKeys = createQueryKeys("auth", {
  detail: (id: string) => [id],
});

export const userQueryKeys = createQueryKeys("user", {
  user: null,
});
export const translateQueryKeys = createQueryKeys("translate", {
  translateText: (text: string) => [text],
  feedbackText: (text: string, sectionId: string, messageId: number) => [
    text,
    sectionId,
    messageId,
  ],
});
export const queryKeys = mergeQueryKeys(
  chatQueryKeys,
  authQueryKeys,
  translateQueryKeys,
  userQueryKeys
);
