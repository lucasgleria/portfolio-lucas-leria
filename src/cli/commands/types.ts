export interface CommandHistory {
    id?: string
    source?: 'professional-profile' | 'professional-profile-ai'
    command: string
    output: string
    type: 'command' | 'output' | 'error' | 'success'
  }
  
  export interface CommandContext {
    language?: 'en' | 'pt-BR'
    setHistory: (history: CommandHistory[]) => void
    setShowProductionModal: (show: boolean) => void
    setShowArticlesModal: (show: boolean) => void
    setShowResumeModal: (show: boolean) => void
    setShowLerChatModal: (show: boolean) => void
  }
