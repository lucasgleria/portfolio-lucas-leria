import { CommandContext } from "./types"

export const aiProjects = (context: CommandContext) => {
  const projects = [
    {
      name: "LibraVoice",
      description: "AI-powered sign language recognition and translation system using LSTM and Computer Vision",
      tech: ["Python", "TensorFlow", "Mediapipe", "Numpy", "OpenCV"],
      impact: "Assists PWD communication through sign language recognition"
    },
    {
      name: "Signature Recognizer", 
      description: "Advanced signature verification using EfficientNet-B0 and Triplet Loss with biometric evaluation",
      tech: ["Python", "PyTorch", "TensorFlow", "EfficientNet-B0", "Triplet Loss"],
      impact: "Published research-level implementation with ROC Curve and EER analysis"
    },
    {
      name: "Seamese Networks Algorithm",
      description: "Image similarity search system using Siamese Networks and Triplet Loss for enhanced matching accuracy",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "Numpy"],
      impact: "Optimizes image retrieval and similarity detection tasks"
    },
    {
      name: "chat-lleria",
      description: "AI chatbot with role-based system using Google Gemini API for personalized interactions",
      tech: ["Python", "Flask", "React", "Google Gemini API", "Tailwind CSS"],
      impact: "Demonstrates advanced AI integration with practical applications"
    }
  ]

  let output = "AI/ML Projects (4 projects):\n\n"
  projects.forEach(project => {
    output += `📁 ${project.name}\n`
    output += `   ${project.description}\n`
    output += `   Technologies: ${project.tech.join(', ')}\n`
    output += `   Impact: ${project.impact}\n\n`
  })

  return output
}
