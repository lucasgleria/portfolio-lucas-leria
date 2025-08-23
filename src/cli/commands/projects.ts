import { CommandContext } from "./types"

export const projects = (context: CommandContext) => {
    const projectCategories = {
        "AI/ML Projects": [
          "LibraVoice - Sign Language Recognition",
          "Signature Recognizer - Neural Network System", 
          "Seamese Networks Algorithm - Image Similarity",
          "chat-lleria - AI Chatbot with Gemini API"
        ],
        "Web Development": [
          "OverChat - Social Network Replica",
          "Linktrell - Linktree-style Application", 
          "BlogApp - Full-Stack Blog",
          "FinancialApp - Digital Banking",
          "Musicaller.ia - Music Course Website",
          "LerCode - Free QR Code Generator",
          "Portfolio Nathalye Vitoria"
        ],
        "Desktop Applications": [
          "lleria-medinizer - Pharmaceutical CRUD",
          "URL Shortener - Desktop Application",
          "Virtual Agenda - Task Management System",
          "Java Inventory Management System"
        ],
        "Architecture & Systems": [
          "Microservices Structure - Docker Architecture",
          "Structures'nAlgorithms - Data Structures Collection"
        ],
        "Game Development": [
          "FlappyZap - WhatsApp-themed Game",
          "Mystical Number Castle - Number guessing Game",
          "The Forca - Hangman Game"
        ]
      }

      let output = "Projects Portfolio (19 total projects):\n\n"
      Object.entries(projectCategories).forEach(([category, projects]) => {
        output += `📁 ${category} (${projects.length}):\n`
        projects.forEach(project => output += `    ${project}\n`)
        output += "\n"
      })
      output += "Type 'ai-projects' or 'web-projects' to see detailed project info!\n"
      output += "Visit: https://github.com/lucasgleria for all repositories"

      return output
}