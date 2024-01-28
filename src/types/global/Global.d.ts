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

type AuthResponse = {
  message: string
  user: {
    id: number
    username: string
    object_id: string
    full_name: string
    email: string
    native_language: string
    target_language: string
    age_range: string
    daily_commitment: number
    motivation: string
    daily_streak: string
    last_active_date: string
    icon_id: number
    background_id: number
    stripe_customer_id: string
  }
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
}

type FeedbackTranslateType = {
  sectionId: string
  difficulty_level: number
  text: string
  message_id: number
}

type ChatTypes = 'USER' | 'BOT'
