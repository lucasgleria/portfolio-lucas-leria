export interface CommandHistory {
    command: string
    output: string
    type: 'command' | 'output' | 'error' | 'success'
  }
  
  export interface CommandContext {
    setHistory: (history: CommandHistory[]) => void
    setShowProductionModal: (show: boolean) => void
    setShowArticlesModal: (show: boolean) => void
    setShowResumeModal: (show: boolean) => void
    setShowLerChatModal: (show: boolean) => void
  }