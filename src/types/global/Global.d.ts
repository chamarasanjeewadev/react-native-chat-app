type FontFamily = {
  poppins100: string
  poppins200: string
  poppins300: string
  poppins400: string
  poppins500: string
  poppins600: string
  poppins700: string
  poppins800: string
  poppins900: string
}
type ThemeColor = 'blue' | 'orange' | 'pink'
type FontSize = {
  fs10: number
  fs12: number
  fs14: number
  fs16: number
  fs18: number
  fs20: number
  fs22: number
  fs24: number
  fs28: number
  fs32: number
  fs40: number
}

type Section = {
  proficiency_level: string
  goal_user: string
  title: string
  topic: string
  source: 'mila' | 'community' | 'mine'
  background_id?: number
  icon_id?: number
  conversation_length: number
  language_details: {
    [key: string]: {
      character_name: string
      context_description: string
      environment: {
        description: string
      }
      voice: {
        gender: string
        interests: string
        name: string
        persona: string
        tone: string
      }
    }
  }
  progress?: {
    [key: string]: {
      difficulty_level: number
      is_completed: boolean
    }
  }
  id: string
  numeric_id: number
  likes: number
  times_played: number
  creator: string
  creation_date: string
}

type ContextTranslateBack = {
  tokenization_response: Token[]
}

type TranslateBack = {
  translated_text: string
  slow_response: string
  audio_response: string
  words: Array<{
    [key: string]: string
  }>
}

type Token = {
  audio: string
  learned?: boolean
  furigana: string
  kanji_only_length: number
  romanization: string
  token: string
  translation: string
  zhuyin: string
}
type User = {
  id: number
  age_range?: string
  email?: string
  full_name?: string
  native_language?: string
  target_language?: Language
  username?: string
  daily_commitment?: number
  stripe_customer_id?: string
  stripe_price_id?: string
  token: string
  motivation?: string
  proficiency?: string
  level: number
  level_name: string
  experience: number
  next_level_exp_req: number
  icon_id: number
  background_id: number
  is_cancel_scheduled: boolean
  plan_expired_on: string
  autoSubmitThreadhold?: number
}

type AuthResponse = {
  message: string
  user: User
  user_metrics: {
    id: string
    user_id: string
    target_language: string
    proficiency: string
    level: number
    level_name: string
    experience: number
    next_level_exp_req: number
    stripe_price_id: string
    streak: DailyStreak
    plan_expired_on: string
    is_cancel_scheduled: boolean
  }
}

interface MessageBack {
  type?: ChatTypes
  user_message: string
  text_response: string
  audio_response: string
  slow_response: string
  message_count: number
  end_conversation: boolean
  feedback_json?: string
  feedback_text?: string
  user_message_id: number
  response_message_id: number
  lastAIMessage?: string
  lastAIMessageId?: number
}

type FeedbackTranslateType = {
  sectionId: string
  difficulty_level: number
  text: string
  message_id: number
}

type GrammarTranslateType = {
  sectionId: string
  ai_text: string
  difficulty_level: number
  text: string
  message_id: number
}
type ChatTypes = 'USER' | 'BOT'

type ThemeColor = 'blue' | 'orange' | 'pink'
interface IThemeColorOptions {
  color: ThemeColor

  bgColor: string
}
interface UserUpdateResponse {
  message: string
  user_metrics: {
    id: number
    user_id: number
    target_language: string
    proficiency: string
    level: number
    level_numeral: number
    level_name: string
    experience: number
    next_level_exp_req: number
  }
}
interface UpdateUser {
  email?: string
  username?: string
  full_name?: string
  native_language?: string
  target_language?: string
  age_range?: string
  daily_commitment?: number
  motivation?: string
  proficiency?: string
  icon_id: number
  background_id: number
}
interface GrammarBack {
  corrected_text: {
    score: number
    feedback: string
  }
}

interface IOption {
  value: string | number
  label: string
}

interface ITargetLanguageOption {
  flag: JSX.Element
  value: Language
  label: JSX.Element
  shortText?: string
}
type ColorMode = 'dark' | 'light' | 'system'

interface IThemeColorOptions {
  color: ThemeColor
  bgColor: string
}
type Language =
  | 'American English'
  | 'British English'
  | 'Spanish'
  | 'Mexican Spanish'
  | 'French'
  | 'German'
  | 'Japanese'
  | 'Mandarin Chinese'
type Notation = 'Furigana' | 'Romaji' | 'Zhuyin'
type NotationType = { lang: Language; notation: Notation }

interface RetryBack {
  end_conversation: boolean
  message_count: number
}
