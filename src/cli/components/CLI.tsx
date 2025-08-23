import React, { useState, useRef, useEffect } from 'react'
import { Terminal, Command, HelpCircle, MessageSquare, User, Code, Mail, Github, Linkedin } from 'lucide-react'
import { CommandHistory } from '../commands/types'
import { ProductionProjectsModal } from './ProductionProjectsModal'
import { createCommandHandlers } from '../commands/handlers'
import { ArticlesModal } from './ArticlesModal'
import { ResumeModal } from './ResumeModal'
import { LerChatModal } from './LerChatModal'
import { productionProjects } from '../data/productionProjects'
import { articles } from '../data/articles'

interface CLIProps {
  onLerMessage?: (message: string) => void
}

export const CLI: React.FC<CLIProps> = ({ onLerMessage }) => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: '',
      output: 'Welcome to Lucas Leria\'s Portfolio CLI! 🚀\nIT Technician | DBA | Full-Stack Developer | Studying AI & Data Science | 19+ Projects\nType "help" to explore commands or "lerchat" to open the Ler Chat desktop app!',
      type: 'success'
    }
  ])
  const [showLer, setShowLer] = useState(true)
  const [lerMessage, setLerMessage] = useState("Hey! I'm Ler, Lucas's AI assistant! 🤖 I'm here to help you explore his amazing portfolio!")
  const [isLerThinking, setIsLerThinking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [showProductionModal, setShowProductionModal] = useState(false)
  const [showArticlesModal, setShowArticlesModal] = useState(false)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [showLerChatModal, setShowLerChatModal] = useState(false)
  
  // Command history navigation state
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [tempInput, setTempInput] = useState('')

  // Fun facts, tips, and jokes about Lucas and tech
  const lerMessages = [
    "💡 Did you know? Lucas has 19+ projects spanning AI/ML, web development, and desktop applications!",
    "🤖 Fun fact: Lucas is fluent in both Python and Portuguese - native in one, expert in the other!",
    "🚀 Lucas's projects have reduced management time by 80% in real-world applications. Now that's efficiency!",
    "🧠 Why do data scientists love nature? Because it has so many natural decision trees! 🌳",
    "💻 Lucas works with TensorFlow, PyTorch, React, and Node.js. Talk about full-stack expertise!",
    "🎓 Lucas graduated with a Database Management degree focused on Data Analysis. Data is in his DNA!",
    "⚡ Why did the developer go broke? Because he used up all his cache! Lucas never has this problem!",
    "🌟 Lucas has 97% English proficiency - almost as perfect as his code formatting!",
    "🔍 Lucas specializes in Computer Vision, NLP, and MLOps. He can make computers see, talk, and learn!",
    "🎯 Fun fact: Lucas is from São Paulo, Brazil - the same city as the headquarters of many tech startups!",
    "🛠️ Lucas uses Docker for containerization. His apps never have the 'it works on my machine' problem!",
    "📊 Why do data scientists make good comedians? They know all the best outliers! 😄",
    "🌐 Lucas has experience with Google Gemini API and conversational AI. He's literally teaching machines to chat!",
    "🎮 When Lucas isn't coding, he's probably training models. Or debugging. Let's be honest, mostly debugging!",
    "🏆 Lucas's projects include LibraVoice - a sign language recognition system. Now that's AI with a purpose!",
    "⚙️ Why did the machine learning model go to therapy? It had too many layers and couldn't stop overthinking!",
    "📱 Lucas builds desktop apps, web apps, and AI systems. He's basically a tech Swiss Army knife!",
    "🎪 Lucas says data science is 90% data cleaning and 10% telling people you're a data scientist!",
    "🌉 Lucas bridges the gap between AI theory and practical applications. He's the bridge everyone wants to cross!",
    "🎪 Why was the developer cold? Because he left his Windows open! Lucas prefers Linux, of course! 🐧"
  ]

  // Loading messages for when Ler is thinking
  const loadingMessages = [
    "🤖 Ler is processing your question...",
    "🧠 Consulting my neural networks...",
    "💭 Searching through Lucas's portfolio data...",
    "🔍 Analyzing the query about Lucas...",
    "⚡ Processing your request at light speed...",
    "🎯 Fetching information about Lucas...",
    "📚 Accessing Lucas's project database...",
    "🌟 Generating a tailored response for you...",
    "🚀 Ler is thinking at the speed of AI...",
    "💡 Consulting my knowledge base about Lucas..."
  ]

  // Get a random message from the array
  const getRandomMessage = () => {
    return lerMessages[Math.floor(Math.random() * lerMessages.length)]
  }

  // Get a random loading message
  const getRandomLoadingMessage = () => {
    return loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
  }

  // Change message when user runs commands
  useEffect(() => {
    if (history.length > 1 && !isLerThinking) { // Don't change on initial load, only after user commands
      setLerMessage(getRandomMessage())
    }
  }, [history, isLerThinking])

  const commandContext = {
    setHistory,
    setShowProductionModal,
    setShowArticlesModal,
    setShowResumeModal,
    setShowLerChatModal
  }

  const commands = createCommandHandlers(commandContext)

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    const [command, ...args] = trimmedCmd.split(' ')
    
    try {
      let output: string = ''
      
      if (command === 'ler') {
        const message = args.join(' ')
        if (message) {
          setIsLerThinking(true)
          setLerMessage(getRandomLoadingMessage())
          
          if (onLerMessage) {
            onLerMessage(message)
          }
          
          // Add initial command entry with thinking message
          setHistory(prev => [...prev, { command: trimmedCmd, output: '🤖 Ler is thinking about your question...', type: 'success' }])
          
          // Fetch AI response
          try {
            const response = await fetch('/api/ler', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message }),
            })
            
            const data = await response.json()
            const aiResponse = data.response || "Sorry, I'm having trouble responding right now!"
            
            // Update the history with the AI response
            setHistory(prev => {
              const newHistory = [...prev]
              // Find and update the last ler command
              for (let i = newHistory.length - 1; i >= 0; i--) {
                if (newHistory[i].command === trimmedCmd && newHistory[i].output === '🤖 Ler is thinking about your question...') {
                  newHistory[i] = { ...newHistory[i], output: `🤖 ${aiResponse}` }
                  break
                }
              }
              return newHistory
            })
            
            // Don't update lerMessage with AI response - let it continue showing random tips
          } catch (error) {
            console.error('Error fetching AI response:', error)
            const fallbackResponse = "Oops! My neural networks are a bit tangled right now. Lucas says that happens during model training too! 🤖"
            
            setHistory(prev => {
              const newHistory = [...prev]
              for (let i = newHistory.length - 1; i >= 0; i--) {
                if (newHistory[i].command === trimmedCmd && newHistory[i].output === '🤖 Ler is thinking about your question...') {
                  newHistory[i] = { ...newHistory[i], output: `🤖 ${fallbackResponse}` }
                  break
                }
              }
              return newHistory
            })
            
            // Don't update lerMessage with fallback response - let it continue showing random tips
          } finally {
            setIsLerThinking(false)
            // After processing, go back to showing random tips
            setTimeout(() => {
              setLerMessage(getRandomMessage())
            }, 2000)
          }
          
          // Clear the input after executing the command
          setInput('')
          return // Return early since we've already updated the history
        } else {
          output = 'Please provide a question for Ler. Example: "ler Tell me about Lucas\'s AI projects"'
        }
      } 
      else if (commands[command as keyof typeof commands]) {
        const cmdFunction = commands[command as keyof typeof commands]
        if (typeof cmdFunction === 'function') {
            output = (cmdFunction as () => string)()
        } else {
          output = cmdFunction as string
        }
      } else {
        output = `Command not found: ${command}. Type 'help' to see available commands.`
      }

      // Add the command with its output in a single entry
      setHistory(prev => [...prev, { command: trimmedCmd, output, type: 'success' }])
    } catch (error) {
      // Add the command with error output in a single entry
      setHistory(prev => [...prev, { 
        command: trimmedCmd, 
        output: `Error executing command: ${error}`, 
        type: 'error' 
      }])
    }

    setInput('')
    
    // Add command to history (only if it's not empty and not the same as the last command)
    if (trimmedCmd && trimmedCmd !== commandHistory[commandHistory.length - 1]) {
      setCommandHistory(prev => {
        const newHistory = [...prev, trimmedCmd]
        // Keep only the last 20 commands
        return newHistory.slice(-20)
      })
    }
    
    // Reset history navigation
    setHistoryIndex(-1)
    setTempInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
  }

  useEffect(() => {
    if (terminalRef.current) {
      // Smooth scroll to bottom with a small delay to ensure content is rendered
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTo({
            top: terminalRef.current.scrollHeight,
            behavior: 'smooth'
          })
        }
      }, 50)
    }
  }, [history])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Reset history navigation when user modifies input manually
  useEffect(() => {
    if (historyIndex !== -1) {
      setHistoryIndex(-1)
      setTempInput('')
    }
  }, [input, historyIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      
      // If we're at the beginning and there's current input, save it
      if (historyIndex === -1 && input.trim()) {
        setTempInput(input)
      }
      
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      
      if (historyIndex > 0) {
        // Go to newer command
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        // Go back to the original input
        setHistoryIndex(-1)
        setInput(tempInput)
      } else if (historyIndex === -1) {
        // Already at the bottom, clear input
        setInput('')
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-800 border-b border-green-400 px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-mono text-sm">Lucas Leria Portfolio CLI v1.0</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowLer(!showLer)}
            className="text-green-400 hover:text-green-300 transition-colors"
            title="Toggle Ler Assistant"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => setHistory([])}
            className="text-green-400 hover:text-green-300 transition-colors"
            title="Clear Terminal"
          >
            <Command className="w-4 h-4" />
          </button>
          <button
            onClick={() => executeCommand('help')}
            className="text-green-400 hover:text-green-300 transition-colors"
            title="Show Help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Main Terminal */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <div
            ref={terminalRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 font-mono text-sm space-y-2 terminal-container"
            style={{
              scrollBehavior: 'smooth'
            }}
          >
            {history.map((item, index) => (
              <div key={index} className="space-y-1 max-w-full">
                {item.command && (
                  <div className="flex items-start space-x-2 min-w-0 w-full max-w-full">
                    <span className="text-green-400 flex-shrink-0 mt-0.5">$</span>
                    <span className="text-green-300 terminal-text flex-1 min-w-0">
                      {item.command}
                    </span>
                  </div>
                )}
                {item.output && (
                  <div
                    className={`${
                      item.type === 'error' ? 'text-red-400' :
                      item.type === 'success' ? 'text-green-300' :
                      'text-green-200'
                    } terminal-output max-w-full`}
                  >
                    {item.output}
                  </div>
                )}
              </div>
            ))}
            
            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-start space-x-2 flex-shrink-0 w-full max-w-full mt-2">
              <span className="text-green-400 flex-shrink-0 mt-0.5">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-green-300 placeholder-green-600 terminal-input min-w-0"
                placeholder="Type a command..."
                autoFocus
              />
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-800 border-t border-green-400 px-4 py-2 flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-green-400">
              <div className="flex items-center space-x-4">
                <span>Type "help" for commands</span>
                <span>•</span>
                <span>↑↓ for command history (20 stored)</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-3 h-3" />
                <span>portfolio-visitor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ler Assistant Sidebar */}
        {showLer && (
          <div className="w-80 bg-gray-800 border-l border-green-400 p-4 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-mono text-sm font-semibold">Ler Assistant</span>
              </div>
              <button
                onClick={() => setShowLer(false)}
                className="text-green-400 hover:text-green-300 transition-colors flex-shrink-0"
              >
                ×
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
              <div className="bg-black border border-green-400 rounded p-3 mb-4">
                <p className="text-green-300 font-mono text-xs leading-relaxed terminal-text">
                  {lerMessage}
                </p>
                {isLerThinking && (
                  <div className="mt-2 flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs">Thinking...</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h4 className="text-green-400 font-mono text-xs font-semibold">Quick Questions:</h4>
                <button
                  onClick={() => executeCommand('ler Tell me about Lucas\'s background')}
                  disabled={isLerThinking}
                  className={`block w-full text-left font-mono text-xs p-2 rounded border transition-colors terminal-text ${
                    isLerThinking 
                      ? 'text-green-600 border-green-800 cursor-not-allowed' 
                      : 'text-green-300 hover:text-green-200 border-green-800 hover:border-green-600'
                  }`}
                >
                  • Tell me about Lucas's background
                </button>
                <button
                  onClick={() => executeCommand('ler What are Lucas\'s main skills?')}
                  disabled={isLerThinking}
                  className={`block w-full text-left font-mono text-xs p-2 rounded border transition-colors terminal-text ${
                    isLerThinking 
                      ? 'text-green-600 border-green-800 cursor-not-allowed' 
                      : 'text-green-300 hover:text-green-200 border-green-800 hover:border-green-600'
                  }`}
                >
                  • What are Lucas's main skills?
                </button>
                <button
                  onClick={() => executeCommand('ler Show me his AI projects')}
                  disabled={isLerThinking}
                  className={`block w-full text-left font-mono text-xs p-2 rounded border transition-colors terminal-text ${
                    isLerThinking 
                      ? 'text-green-600 border-green-800 cursor-not-allowed' 
                      : 'text-green-300 hover:text-green-200 border-green-800 hover:border-green-600'
                  }`}
                >
                  • Show me his AI projects
                </button>
                <button
                  onClick={() => executeCommand('ler How can I contact Lucas?')}
                  disabled={isLerThinking}
                  className={`block w-full text-left font-mono text-xs p-2 rounded border transition-colors terminal-text ${
                    isLerThinking 
                      ? 'text-green-600 border-green-800 cursor-not-allowed' 
                      : 'text-green-300 hover:text-green-200 border-green-800 hover:border-green-600'
                  }`}
                >
                  • How can I contact Lucas?
                </button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-green-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-400 font-mono">Ler AI</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${isLerThinking ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                  <span className="text-green-400">{isLerThinking ? 'Thinking...' : 'Online'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductionProjectsModal
        showProductionModal={showProductionModal}
        setShowProductionModal={setShowProductionModal}
        productionProjects={productionProjects}
      />
      
      <ArticlesModal
        showArticlesModal={showArticlesModal}
        setShowArticlesModal={setShowArticlesModal}
        articles={articles}
      />
      
      <ResumeModal
        showResumeModal={showResumeModal}
        setShowResumeModal={setShowResumeModal}
      />
      
      <LerChatModal
        isOpen={showLerChatModal}
        onClose={() => setShowLerChatModal(false)}
      />
    </div>
  )
}