'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, Minus, Square, Maximize2, Bot, User } from 'lucide-react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface LerChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LerChatModal: React.FC<LerChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hey! I'm Ler, Lucas's AI assistant! 🤖 How can I help you explore his amazing portfolio today?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage.trim() }),
      })

      const data = await response.json()
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "Sorry, I'm having trouble responding right now!",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error fetching AI response:', error)
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! My neural networks are a bit tangled right now. Lucas says that happens during model training too! 🤖",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-2 sm:p-4 overflow-hidden">
      <div className="bg-black border border-green-400 rounded-lg w-full max-w-4xl h-[95vh] sm:h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 border-b border-green-400 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
            <h2 className="text-green-400 font-mono text-sm sm:text-lg font-semibold truncate">
              Chat with Ler • AI Assistant
            </h2>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
              title="Close Chat"
            ></button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-gray-900 overflow-y-auto p-3 sm:p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[70%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-800 text-green-300 border border-green-400'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <Bot className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    )}
                    {message.role === 'user' && (
                      <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs sm:text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-green-200' : 'text-green-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-green-300 border border-green-400 rounded-lg p-3 max-w-[80%] sm:max-w-[70%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-green-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-gray-900 border-t border-green-400 p-3 sm:p-4 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about Lucas's portfolio..."
              className="flex-1 bg-gray-800 border border-green-400 rounded-lg px-3 py-2 text-green-300 font-mono text-xs sm:text-sm placeholder-green-500 focus:outline-none focus:border-green-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Send</span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 border-t border-green-400 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-green-400">
            <span className="hidden sm:inline">Ask about projects, skills, or experience</span>
            <span className="hidden sm:inline">•</span>
            <span>Powered by AI</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bot className="w-3 h-3 text-green-400 flex-shrink-0" />
            <span className="text-green-400 font-mono text-xs truncate">Ler AI Assistant</span>
          </div>
        </div>
      </div>
    </div>
  )
}