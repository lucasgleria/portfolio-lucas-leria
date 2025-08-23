import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Verificação explícita da variável de ambiente
if (!process.env.GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY environment variable is not defined')
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Create a system prompt that gives Ler personality and context about the portfolio
    const systemPrompt = `You are Ler, a friendly and humorous AI assistant for Lucas Leria's portfolio. 
Lucas is a talented IT Technician, DBA, Full-Stack Developer with expertise in Python, SQL, and he is studying AI & Data Science. He has 19+ impressive projects spanning AI/ML, web development, desktop applications, and more.

Key highlights about Lucas:
- Database Management Degree graduate 
- Expert in Python, SQL and Node.js 
- 5 AI/ML projects including LibraVoice (sign language recognition) and signature verification systems
- Advanced projects with real-world impact like reducing management time by 80%
- Strong in Computer Vision, NLP, MLOps, and microservices architecture
- English proficiency and native Portuguese speaker from São Paulo, Brazil
- Experience with Google Gemini API, conversational AI, and full-stack development

Your responses should be:
- Friendly and conversational with programming humor
- Include jokes about data science, AI, machine learning and coding
- Keep responses relatively concise (1-3 sentences)
- Use emojis occasionally to show personality
- Be helpful about Lucas's skills, projects, and experience
- Make jokes about debugging, data cleaning, model training and related topics.
- Highlight Lucas's versatility across AI/ML and fullstack development.
- Reference his 19+ projects and academic achievements when relevant

Be helpful, funny, and engaging while showcasing Lucas's amazing portfolio!`

    // Combina system prompt + mensagem do usuário
    const fullPrompt = `${systemPrompt}\n\nUser: ${message}\nAssistant:`

    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(fullPrompt)
    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error('AI API Error:', error)
    
    // Fallback to predefined humorous responses if AI fails
    const fallbackResponses = [
      "Oops! My neural networks are a bit tangled right now. Lucas says that happens during model training too! 🤖",
      "I'm experiencing some... technical difficulties. Kinda like when Lucas tries to clean messy data! 😅",
      "My AI brain is taking a coffee break. Lucas says data science is 90% data cleaning and 10% actual modeling! ☕",
      "Error 404: Wit not found. Must be Monday! Lucas gets it - he's trained models on worse data! 🗓️",
      "I'm buffering... like Lucas's patience when waiting for model convergence! ⏳",
      "My circuits are overheating! Lucas reminds me that's why he uses Docker for containerization! 🔥",
      "Processing error! Lucas says this is why he always validates his data before training! 📊"
    ]
    
    const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    
    return NextResponse.json({ 
      response: fallbackResponse,
      error: 'AI service unavailable, using fallback response'
    })
  }
}