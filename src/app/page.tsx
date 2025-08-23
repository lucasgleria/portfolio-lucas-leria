'use client'

import { useState } from 'react'
import { CLI } from '@/cli/components/CLI'

export default function Home() {
  const [lerMessage, setLerMessage] = useState("")

  const handleLerMessage = (message: string) => {
    setLerMessage(message)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 p-4 relative overflow-hidden">
      {/* Matrix-style background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-gray-900 to-green-900"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="text-center py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-green-400 font-mono mb-2">
            Lucas Leria
          </h1>
          <p className="text-xl md:text-2xl text-green-300 font-mono">
            IT Technician | DBA | Full-Stack Developer | Studying AI & Data Science
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-green-400">
            <a href="https://github.com/lucasgleria" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/lucasleria" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:lucasleria17@gmail.com" className="hover:text-green-300 transition-colors">
              Email
            </a>
          </div>
        </header>

        {/* CLI Interface */}
        <div className="flex-1 max-w-7xl mx-auto w-full">
          <div className="bg-black border-2 border-green-400 rounded-lg shadow-2xl h-[70vh]">
            <CLI onLerMessage={handleLerMessage} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-4 text-green-400 font-mono text-sm">
          <p>© 2025 Lucas Gomes Leria. For a better experience, use a computer view.</p>
          <p className="mt-1">Type "help" in the terminal above to explore the portfolio.</p>
        </footer>
      </div>

      {/* Ler Message Handler (for API calls) */}
      {lerMessage && (
        <div className="hidden">
          {/* This is just to trigger the API call - the actual handling is done in the CLI component */}
          <form action="/api/ler" method="POST">
            <input type="hidden" name="message" value={lerMessage} />
          </form>
        </div>
      )}
    </div>
  )
}