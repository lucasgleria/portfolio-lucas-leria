# 🚀 Lucas Leria Portfolio CLI

**Interactive portfolio with terminal interface developed in Next.js and TypeScript**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)]()
[![Status](https://img.shields.io/badge/status-in%20production-green.svg)]()
[![Deploy](https://img.shields.io/badge/deploy-active-green.svg)]()

## 📌 Table of Contents

1. [About the Project](#-about-the-project)  
2. [Objectives](#-objectives)  
3. [Technologies](#-technologies)  
4. [Features](#-features)  
5. [Prerequisites](#️-prerequisites)  
6. [Installation](#️-installation)  
7. [How to Use](#-how-to-use)
8. [Project Structure](#-project-structure)
9. [Contributing](#-contributing)  
10. [License](#-license)  
11. [Contact](#-contact)  
12. [Additional Resources](#-additional-resources)  

## 💻 About the Project  

The **Lucas Leria Portfolio CLI** is an innovative interactive portfolio that simulates a terminal interface with a Matrix/hacker theme, creating a unique and memorable experience to explore Lucas Gomes Leria's professional profile.

- **Motivation**: Create a differentiated experience that highlights technical skills in an interactive way
- **Target audience**: Recruiters, developers, technology companies, and the tech community
- **Problem solved**: Traditional portfolios are static and not very memorable
- **Differentiator**: Web-based CLI interface with integrated AI assistant
- **Methodology**: Agile development with focus on UX/UI

## 🎯 Objectives  

### 🛠️ Technical  
- Develop functional CLI interface in web environment
- Implement extensible and intuitive command system
- Integrate AI assistant with Google Gemini API
- Create responsive and accessible experience

### 📚 Professional  
- Present 19+ projects in an organized and interactive way
- Demonstrate full-stack development skills
- Show expertise in AI/ML and modern technologies
- Highlight experience in real impact projects

### 🌍 User Experience  
- Create memorable and differentiated experience
- Facilitate navigation through professional information
- Provide natural interaction with AI assistant
- Maintain consistent design with technical theme

## 🚀 Technologies  

**Frontend & Framework**  
- Next.js 15 (App Router)
- TypeScript 5
- Tailwind CSS 4
- React 19

**UI & Components**  
- shadcn/ui
- Radix UI
- Framer Motion
- Lucide React

**Backend & APIs**  
- Google Gemini AI
- Socket.IO
- Next.js API Routes

**State & Data**  
- Zustand
- React Hook Form
- Zod Validation

## ✨ Features  

- ✅ **Interactive CLI Interface:** Web-based terminal with Matrix theme, functional commands, and history navigation
- ✅ **Command System:** 25+ commands organized by category (projects, skills, experience, etc.)
- ✅ **AI Assistant "Ler":** Integration with Google Gemini API, humorous personality and contextual responses
- ✅ **Interactive Modals:** Project visualization in production, articles, resume and live demos
- ✅ **Responsive Design:** Adaptable interface for different devices with consistent technical theme
- ✅ **Real-time Features:** Socket.IO for real-time communication and dynamic updates
- ✅ **Intuitive Navigation:** Command history, autocomplete and immediate visual feedback

## ⚙️ Prerequisites  

To run the project locally, you will need:

- **Node.js**: Version 18.0.0 or newer
- **npm** or **yarn**: Package manager
- **Git**: To clone the repository
- **Google Gemini API Key**: For AI assistant functionality
- **IDE**: Visual Studio Code, WebStorm or similar
- **Browser**: Chrome, Firefox, Safari or modern Edge
- **Storage**: 2GB+ RAM and 1GB+ free disk space

## 🛠️ Installation  

1. Clone the repository:
```bash
git clone https://github.com/lucasgleria/my-portf.git
```

2. Navigate to the project directory:
```bash
cd my-portf
```

3. Install dependencies:
```bash
npm install
```

4. Configure environment variables:
```bash
# Create a .env.local file in the project root
cp .env.example .env.local

# Add your Google Gemini API Key
GOOGLE_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

## ❗ How to Use

1. Access the portfolio:
```
http://localhost:3000
```

2. Explore available commands:
Type `help` in the terminal to see all available commands.

3. Interact with the AI assistant:
Use the command `ler <your question>` to chat with the AI assistant.

4. Navigate through projects:
- `projects` - See all projects
- `aiProjects` - AI/ML projects
- `desktopApps` - Desktop projects
- `gameProjects` - Game development
- `otherProjects` - DSA projects
- `webProjects` - Web projects
- `production` - Projects in production

### ▶️ Main Commands

```bash
help                    # Shows all available commands
articles                # Published articles
production              # Projects in production with demos
resume                  # Complete resume with Interface
ler <question>          # Chat with AI assistant
projects                # Lists all projects
skills                  # Technical skills
experience              # Professional experience
contact                 # Contact information
stats                   # Project statistics
```

## 📂 Project Structure  

```plaintext
my-portf/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes (ler, health)
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Main layout
│   │   └── page.tsx           # Home page
│   ├── cli/                   # Complete CLI system
│   │   ├── commands/          # 25+ organized commands
│   │   │   ├── handlers.ts    # Command manager
│   │   │   ├── types.ts       # TypeScript types
│   │   │   └── *.ts           # Individual commands
│   │   ├── components/        # CLI components
│   │   │   ├── CLI.tsx        # Main interface
│   │   │   └── *.tsx          # Modals and components
│   │   └── data/              # Portfolio data
│   │       ├── portfolio.ts   # Main data
│   │       ├── articles.ts    # Published articles
│   │       └── productionProjects.ts
│   ├── components/ui/         # shadcn/ui components
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utilities and configurations
│       ├── socket.ts          # Socket.IO configuration
│       └── utils.ts           # Utility functions
├── public/                    # Static files
├── server.ts                  # Custom server with Socket.IO
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🤝 Contributing

Contributions are welcome! Follow these steps:

### **1. Report bugs**
- Open an [issue](https://github.com/lucasgleria/lucas-leria-portfolio/issues) on GitHub
- Describe the problem in detail
- Include screenshots and logs if possible

### **2. Suggest improvements**
- Send ideas through issues
- Propose new features
- Discuss design improvements

### **3. Develop**
- Fork the project
- Create a branch (`git checkout -b feature/new-feature`)
- Make your changes following project standards
- Add tests for new features
- Commit (`git commit -m 'feat: new feature'`)
- Send a Pull Request

### **4. Code Standards**
- Follow Next.js conventions
- Use TypeScript for type safety
- Keep components small and reusable
- Document complex functions
- Test on different devices

## 📜 License  

Distributed under MIT license. See [LICENSE](LICENSE) for more information. 

## 📞 Contact
- **Author**: [Lucas Gomes Leria](https://github.com/lucasgleria)
- **Email**: lucasleria17@gmail.com
- **LinkedIn**: [lucasleria](https://www.linkedin.com/in/lucasleria/)
- **GitHub**: [lucasgleria](https://github.com/lucasgleria)

## 🔎 Additional Resources  

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google Gemini AI](https://ai.google.dev/gemini)
- [Socket.IO](https://socket.io/docs/)
- [shadcn/ui Components](https://ui.shadcn.com/)
