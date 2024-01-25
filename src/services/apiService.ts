import { axiosInstance } from "../utils/axiosApiUtil";

export const signIn = async () => {
  let result = await axiosInstance.post<AuthResponse>(`/user/login`, {});
  return result.data;
};
export const sectionsCommunity = async (query: any) => {
  let result = await axiosInstance.get<AuthResponse>(
    `/user/sections/community?filter_type=${query.filter_type}&search=${query.search}`,
    {}
  );
  return result.data;
};

export const getUserChats = async () => {
  let result = await axiosInstance.get<AuthResponse>(`/user/sections/mila`, {});
  return result.data;
};
export const getUserStats = async () => {
  let result = await axiosInstance.post<AuthResponse>(`/user/statistics`, {});
  return result.data;
};

export const firstChat = async ({ queryKey }) => {
  const [_, sectionId] = queryKey;
  console.log("section id", sectionId);
  let result = await axiosInstance.post<MessageBack>(
    `/conversation/section/${sectionId}`,
    { difficulty_level: 1 }
  );
  return result.data;
};
export const contextTranslate = async ({ queryKey }) => {
  const [_, text] = queryKey;
  let result = await axiosInstance.post<ContextTranslateBack>(
    `/feedback/contexttranslate`,
    { text }
  );
  return result.data;
};
