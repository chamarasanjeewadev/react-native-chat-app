export enum AskMode {
  Audio = 'audio',
  Text = 'text'
}

export enum RecordState {
  STOPPED = 0,
  RECORDING = 1,
  ANALYZING = 2
}

export enum ConversationProgress {
  NOT_STARTED,
  STARTED,
  FINISHED
}

export enum LanguageEnum {
  American = 'American English',
  British = 'British English',
  Spanish = 'Spanish',
  Mexican = 'Mexican Spanish',
  French = 'French',
  German = 'German',
  Japanese = 'Japanese',
  Chinese = 'Mandarin Chinese'
}
export enum ThreadType {
  BOT = 'bot',
  USER = 'user'
}

export enum StudyMode {
  CONVERSATION_EASY = 1,
  CONVERSATION_MEDIUM = 2,
  CONVERSATION_HARD = 3,
  LESSON_WORD = 4
}
