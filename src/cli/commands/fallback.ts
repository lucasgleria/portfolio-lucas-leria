import { portfolioData } from '../data/portfolio'
import { productionProjects } from '../data/productionProjects'
import { articles } from '../data/articles'
import { CommandContext } from './types'

export const createCommandHandlers = (context: CommandContext) => {
  const { setHistory, setShowProductionModal, setShowArticlesModal, setShowResumeModal, setShowLerChatModal } = context

  return {
    help: () => {
      return `Available Commands:
  about          - Learn about Lucas
  ai-projects    - AI/ML projects only
  articles       - View published articles and writings
  certifications - Certifications and courses
  clear          - Clear the terminal
  contact        - Get contact information
  date           - Show current date and time
  desktop-apps   - Desktop application projects only
  echo <text>    - Echo text back to you
  education      - Academic background
  experience     - Professional experience
  game-projects  - Game development projects only
  ler <msg>      - Chat with Ler AI assistant
  lerchat        - Open Ler Chat desktop app
  help           - Show this help message
  languages      - Language proficiency
  ls             - List portfolio sections
  other-projects - Architecture & Systems projects only
  production     - View production projects (Live Demos!)
  projects       - See projects portfolio
  resume         - View Lucas's full resume in browser
  skills         - View technical skills
  stats          - Project statistics
  web-projects   - Web development projects only
  whoami         - Show current user info`
    },
    about: () => portfolioData.about,
    skills: () => {
      const skillCategories = {
        "Programming Languages": ["Python", "JavaScript", "TypeScript", "Java", "PHP", "R", "HTML", "CSS"],
        "AI/ML & Data Science": ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Data Science", "Computer Vision", "NLP", "MLOps", "Power BI"],
        "Web Development": ["React", "Node.js", "Django", "Flask", "FastAPI", "Express.js", "Bootstrap", "Tailwind"],
        "Databases": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "SQLite3", "Neo4j"],
        "DevOps & Cloud": ["Docker", "Docker Compose", "Prometheus", "Grafana", "Railway", "Vercel"],
        "Tools & Others": ["Git", "GitHub", "Figma", "Canva", "HubSpot", "Rubeus"]
      }
      
      let output = "Technical Skills by Category:\n\n"
      Object.entries(skillCategories).forEach(([category, skills]) => {
        output += `${category}:\n`
        skills.forEach(skill => output += `  • ${skill}\n`)
        output += "\n"
      })
      return output
    },
    projects: () => {
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
    },
    'ai-projects': () => {
      const aiProjects = [
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
      aiProjects.forEach(project => {
        output += `📁 ${project.name}\n`
        output += `   ${project.description}\n`
        output += `   Technologies: ${project.tech.join(', ')}\n`
        output += `   Impact: ${project.impact}\n\n`
      })
      return output
    },
    'web-projects': () => {
      const webProjects = [
        {
          name: "OverChat",
          description: "X social network replica focused on business communication",
          tech: ["HTML", "CSS", "JavaScript", "Vercel", "Prisma"],
          highlight: "Complete frontend and backend development"
        },
        {
          name: "Linktrell",
          description: "Linktree-style application for centralized social media and project links",
          tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
          highlight: "Modern responsive design with analytics"
        },
        {
          name: "BlogApp",
          description: "Complete blog system with posts, categories, and admin panel",
          tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
          highlight: "Full-stack with authentication and CRUD operations"
        },
        {
          name: "FinancialApp",
          description: "Digital banking application with transaction management and security",
          tech: ["React", "Node.js", "PostgreSQL", "Stripe API", "Docker"],
          highlight: "Secure payment integration and data encryption"
        },
        {
          name: "LerCode",
          description: "A web application that provides a free and intuitive solution for generating QR codes instantly.",
          tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "QRCode.js"],
          highlight: "High-quality download of QR codes in PNG format."
        },
        {
          name: "Portfolio Nathalye Vitoria",
          description: "A modern and responsive web application built to professionally showcase projects, certifications, and technical skills.",
          tech: ["Next.js 15", "React 19", "Typescript 5", "Tailwind CSS 4", "shadcn/ui"],
          highlight: "Optimized for performance with lazy loading and code splitting."
        }
      ]

      let output = "Web Development Projects (6 projects):\n\n"
      webProjects.forEach(project => {
        output += `📁 ${project.name}\n`
        output += `   ${project.description}\n`
        output += `   Technologies: ${project.tech.join(', ')}\n`
        output += `   Highlight: ${project.highlight}\n\n`
      })
      return output
    },
    'desktop-apps': () => {
      const webProjects = [
        {
          name: "lleria-medinizer",
          description: "Pharmaceutical CRUD",
          tech: ["-", "-", "-", "-", "-"],
          highlight: "-"
        },
        {
          name: "URL Shortener",
          description: "-",
          tech: ["-", "-", "-", "-", "-"],
          highlight: "-"
        },
        {
          name: "Virtual Agenda",
          description: "Task Management System",
          tech: ["-", "-", "-", "-", "-"],
          highlight: "-"
        },
        {
          name: "Java Inventory Management System",
          description: "-",
          tech: ["-", "-", "-", "-", "-"],
          highlight: "-"
        }
      ]

      let output = "Desktop Applications (4 projects):\n\n"
      webProjects.forEach(project => {
        output += `📁 ${project.name}\n`
        output += `   ${project.description}\n`
        output += `   Technologies: ${project.tech.join(', ')}\n`
        output += `   Highlight: ${project.highlight}\n\n`
      })
      return output
    },
    'other-projects': () => {
      const webProjects = [
        {
          name: "Microservices Structure",
          description: "Docker Architecture",
          tech: ["-", "-", "-", "-", "-"],
          highlight: "-"
        },
        {
          name: "Structures'nAlgorithms",
          description: "Data Structures Collection",
          tech: ["-", "-", "-", "-", "-"],
          highlight: "-"
        }
      ]

      let output = "Architecture & Systems (2 projects):\n\n"
      webProjects.forEach(project => {
        output += `📁 ${project.name}\n`
        output += `   ${project.description}\n`
        output += `   Technologies: ${project.tech.join(', ')}\n`
        output += `   Highlight: ${project.highlight}\n\n`
      })
      return output
    },
    'game-projects': () => {
      const webProjects = [
        {
          name: "FlappyZap",
          description: "WhatsApp-themed Game",
          tech: ["-", "-", "-", "-", "-"],
          highlight: "-"
        },
        {
          name: "Mystical Number Castle",
          description: "",
          tech: ["-", "-", "-", "-", "-"],
          highlight: "-"
        },
        {
          name: "The Froca",
          description: "",
          tech: ["-", "-", "-", "-", "-"],
          highlight: "-"
        }
      ]

      let output = "Game Development (3 projects):\n\n"
      webProjects.forEach(project => {
        output += `📁 ${project.name}\n`
        output += `   ${project.description}\n`
        output += `   Technologies: ${project.tech.join(', ')}\n`
        output += `   Highlight: ${project.highlight}\n\n`
      })
      return output
    },
    production: () => {
      setShowProductionModal(true)
      return 'Opening production projects viewer...'
    },
    articles: () => {
      setShowArticlesModal(true)
      return 'Opening articles viewer...'
    },
    resume: () => {
      setShowResumeModal(true)
      return 'Opening resume viewer...'
    },
    lerchat: () => {
      setShowLerChatModal(true)
      return '🖥️  Opening Ler Chat desktop application...'
    },
    contact: () => `Contact Information:
  📧 Email: ${portfolioData.contact.email}
  📱 Phone: +55 11 94573-5280
  📍 Location: São Paulo, Brazil
  💻 GitHub: ${portfolioData.contact.github}
  💼 LinkedIn: ${portfolioData.contact.linkedin}`,
    experience: () => `Professional Experience:

🚀 IT Technician | Company Name | 2022 - Present
  • Provide technical support and maintenance for computer systems
  • Manage database operations and optimize performance
  • Implement security protocols and backup solutions
  • Collaborate with development teams on system integration

🔧 Database Administrator Intern | Tech Corp | 2021 - 2022
  • Assisted in database design and optimization
  • Monitored database performance and implemented improvements
  • Supported data migration and backup procedures
  • Documented database processes and procedures`,
    education: () => `Academic Background:

🎓 Bachelor's Degree in Database Management
  University of São Paulo (USP) | 2020 - 2025
  • GPA: 3.8/4.0
  • Relevant coursework: Database Systems, Data Structures, Algorithms
  • Senior thesis: "Optimization of Database Queries in Large-Scale Systems"

📊 Data Science Certification
  IBM Data Science Professional Certificate | 2023
  • Completed courses in Python, SQL, Machine Learning, and Data Visualization
  • Applied learning through capstone projects and case studies`,
    certifications: () => `Certifications and Courses:

📜 IBM Data Science Professional Certificate | 2023
  • Python for Data Science, AI, and Development
  • SQL and Database Fundamentals
  • Machine Learning with Python
  • Data Visualization and Communication

🔧 AWS Certified Cloud Practitioner | 2023
  • Cloud Computing Fundamentals
  • AWS Core Services
  • Security and Compliance
  • Billing and Pricing

📱 Google IT Support Professional Certificate | 2022
  • Technical Support Fundamentals
  • Networking and Operating Systems
  • System Administration and IT Infrastructure
  • IT Security`,
    languages: () => `Language Proficiency:

🇧🇷 Portuguese (Native)
  • Fluent in both written and spoken communication
  • Academic and professional experience

🇺🇸 English (Advanced)
  • TOEFL Score: 95/120
  • Professional working proficiency
  • Technical documentation and presentation skills

🇪🇸 Spanish (Intermediate)
  • B1 Level certification
  • Conversational proficiency
  • Technical reading comprehension`,
    stats: () => `Project Statistics:

📊 Total Projects: 19
  • AI/ML Projects: 4
  • Web Development: 6
  • Desktop Applications: 4
  • Architecture & Systems: 2
  • Game Development: 3
  • Other: 3

🛠️ Technologies Used: 25+
  • Programming Languages: 8
  • Frameworks & Libraries: 12
  • Databases: 6
  • Tools & Platforms: 9

📈 Platform Distribution:
  • GitHub: 19 repositories
  • Live Demos: 3 projects
  • Published Articles: 1

🎯 Key Areas:
  • Data Science & AI: 7 projects
  • Full-Stack Development: 9 projects
  • Database Management: 4 projects`,
    clear: () => {
      setHistory([])
      return ''
    },
    ler: (args: string[]) => {
      const message = args.join(' ')
      if (!message) {
        return 'Please provide a question for Ler. Example: "ler Tell me about Lucas\'s AI projects"'
      }
      // This command is handled specially in the CLI component
      return `🤖 Ler is processing your question: "${message}"`
    },
    whoami: () => `User: portfolio-visitor
Access: guest
Session: ${new Date().toISOString()}
Viewing: Lucas Leria's Portfolio CLI`,
    ls: () => `Portfolio Contents:
  about.txt          - About Lucas
  ai-projects.txt    - AI/ML projects only
  articles           - Published articles and writings
  certifications.txt - Certifications and courses
  contact.txt        - Contact information
  education.txt      - Academic background
  experience.txt     - Professional experience
  languages.txt      - Language proficiency
  ler.ai             - AI Assistant
  lerchat            - Ler Chat desktop application
  production         - Production projects (Live Demos!)
  projects/          - Projects portfolio (19 projects)
  resume             - Full resume browser viewer
  stats.txt          - Project statistics
  skills.txt         - Technical skills by category
  web-projects.txt   - Web development projects`,
    date: () => new Date().toString(),
    echo: (args: string[]) => args.join(' '),
  }
}