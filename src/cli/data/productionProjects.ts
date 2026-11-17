export type ProjectCategory = 'web' | 'ai' | 'games'

export interface ProductionProject {
    category: ProjectCategory
    name: string
    seo: string
    description: string
    year: number
    role: string
    status: 'In Progress' | 'Concluded' | 'Published' | 'Documented use'
    team: string[]
    technologies: string[]
    features: string[]
    highlights: string[]
    challenges: string[]
    results: string[]
    publicationNote?: string
    link?: string
    demo?: string
    documentation?: string
  }
  
  export const productionProjects: ProductionProject[] = [
    {
      name: 'vault-template',
      category: 'ai',
      seo: 'vault-template-reusable-agent-guided-knowledge-system',
      description: 'Reusable, agent-guided vault for organizing projects, tasks and knowledge. The public repository is the product: copy or clone it to a chosen environment and configure it with an AI agent that can access its files.',
      year: 2026,
      role: 'Author and Maintainer',
      status: 'Published',
      team: ['Lucas Leria'],
      technologies: ['Markdown', 'JSON Schema', 'Python', 'Git'],
      features: [
        'Progressive conversational setup with saved configuration state',
        'Shared project instructions for Codex, Cursor, Claude Code, Gemini CLI and GitHub Copilot',
        'Reusable templates for projects, tasks, knowledge and routines',
        'Continuity files for resuming work across sessions and agents',
        'Versioned configuration, JSON schemas and Python structural validators',
      ],
      highlights: [
        'The repository itself is the distributable product',
        'Open file formats and an MIT license support copying and adaptation',
      ],
      challenges: ['Preserving continuity across agents', 'Adapting organization without changing shared data contracts'],
      results: [
        'Public MIT-licensed repository published in November 2026',
        'Reusable configuration and instructions available for environments with compatible file-access tools',
      ],
      publicationNote: 'Published as a reusable repository under MIT. Operation depends on the chosen agent’s file access and support for project instructions.',
      link: 'https://github.com/lucasgleria/vault-template',
      documentation: 'https://github.com/lucasgleria/vault-template/blob/main/README.md',
    },
    {
      name: 'Rendller',
      category: 'web',
      seo: 'rendller-fixed-income-tracking-and-simulation',
      description: 'Web application for tracking bank fixed-income investments and comparing scenarios. Combines a configurable calculation engine, maturity and liquidity views, local persistence and optional encrypted account synchronization.',
      year: 2026,
      role: 'Full-stack Developer',
      status: 'Published',
      team: ['Lucas Leria'],
      technologies: ['React 19', 'TypeScript', 'Vite', 'Supabase', 'Netlify', 'Recharts', 'Web Crypto'],
      features: [
        'Investment lots, partial redemptions, maturities and institution concentration',
        'Side-by-side simulations with configurable tax and return assumptions',
        'Business-day calculations using public CDI history and a holiday calendar',
        'Browser persistence, JSON backups and spreadsheet import',
        'Optional encrypted synchronization with Supabase account access',
      ],
      highlights: ['Calculation rules separated from the React interface', 'Local operation with optional cloud synchronization'],
      challenges: ['Separating realized returns from estimates', 'Preserving local records during migration and synchronization'],
      results: ['Netlify deployment documented in the project README', 'Calculation, migration and synchronization tests available in the source project'],
      publicationNote: 'Technical case of a published application. Projections are estimates; this presentation contains no real financial records. The current hosted workflows were not revalidated.',
    },
    {
      name: 'Treino IA',
      category: 'ai',
      seo: 'treino-ia-offline-first-workout-planning-pwa',
      description: 'Workout-planning PWA combining deterministic plans, session tracking and an AI Coach whose proposed changes require user approval. Offline storage and account synchronization support continuity across sessions.',
      year: 2026,
      role: 'Full-stack Developer',
      status: 'Published',
      team: ['Lucas Leria'],
      technologies: ['React 19', 'TypeScript', 'Vite', 'Supabase', 'IndexedDB', 'Vercel'],
      features: [
        'Workout planning, versioned plans and session tracking',
        'Offline persistence with IndexedDB',
        'Account isolation and incremental synchronization with retry handling',
        'AI Coach proposals that require explicit user acceptance',
        'Calendar feed generated on the device after pending synchronization clears',
      ],
      highlights: [
        'Offline-first architecture with local persistence and cloud reconciliation',
        'Separation between deterministic planning and AI proposals',
      ],
      challenges: ['Preserving records during synchronization', 'Keeping AI changes under user control'],
      results: [
        'Published implementation documented in the October 2026 review',
        'Planning, history and synchronization implemented; current production flows were not revalidated in this portfolio review',
      ],
      publicationNote: 'Technical case. The application repository is private; a public demonstration is not linked here.',
    },
    {
      name: 'Classes Points',
      category: 'web',
      seo: 'classes-points-classroom-assessment-management',
      description: 'Mobile-focused classroom management application for points, written and oral assessments, class records and PDF reports. The technical case covers implemented workflows and documented teaching use.',
      year: 2026,
      role: 'Full-stack Developer',
      status: 'Documented use',
      team: ['Lucas Leria'],
      technologies: ['Node.js 24', 'Express 5', 'JavaScript', 'PostgreSQL', 'SQLite', 'Vercel'],
      features: [
        'Class management and individual or batch point recording',
        'Written assessments and weighted oral assessments',
        'Assessment history, reviews and PDF reports',
        'Server-rendered HTML with JavaScript and CSS',
        'PostgreSQL/Neon deployment support and SQLite for local development',
      ],
      highlights: [
        'Workflows developed around teaching practice',
        'Separate local and hosted database adapters',
      ],
      challenges: ['Preserving assessment history', 'Improving operation latency and PDF presentation'],
      results: [
        'Classroom use documented in October 2026',
        'PDF presentation and performance improvements remain open; current production configuration was not revalidated',
      ],
      publicationNote: 'Technical case. The teacher panel and real classroom records are not part of a public demonstration.',
    },
    {
      name: "chat-lleria",
      category: 'ai',
      seo: "chat-lleria-intelligent-chatbot-gemini-api-role-system",
      description: "AI-powered chatbot using Google Gemini 1.5 Flash API with a sophisticated role system for personalized resume interactions. Features 4 different user profiles (Recruiter, Developer, Client, Student) with customized responses.",
      year: 2025,
      role: "Fullstack Developer",
      status: "In Progress",
      team: ["Lucas Leria"],
      technologies: ["Python 3.11", "Flask", "React 18", "Google Gemini API", "Tailwind CSS", "Axios", "JSON", "REST APIs"],
      features: [
        "Intelligent chatbot with Gemini API",
        "Personalized profile system",
        "Real-time interface with history",
        "Responsive design and animations",
        "RESTful API with custom prompts"
      ],
      highlights: [
        "Advanced AI integration with Google Gemini 1.5 Flash API for intelligent conversations",
        "Sophisticated role system with 4 personalized interaction profiles (Recruiter, Developer, Client, Student)",
        "Full-stack development with Flask backend and React frontend with modern UI/UX",
        "Real-time chat interface with conversation history and context management",
        "Responsive design with smooth animations and multi-screen user flow",
        "RESTful API architecture with role-based prompt customization and validation"
      ],
      challenges: [
        "Integration with Gemini API",
        "Conversation context management",
        "Prompt customization by profile"
      ],
      results: [
        "Chatbot functional for resume demonstration",
        "Documentation published",
        "Planned use for portfolio"
      ],
      link: "https://github.com/lucasgleria/Gemini-ChatBot",
      demo: "https://chat-lleria.vercel.app/",
      documentation: "https://github.com/lucasgleria/Gemini-ChatBot/blob/main/README.md"
    },
    {
      name: "Mystical Number Castle",
      category: 'games',
      seo: "mystical-number-castle-interactive-guessing-game-vuejs",
      description: "An interactive web game where the player challenges a genie in a mystical castle, trying to guess the secret number. This project is a collaborative evolution of a classic C-based CLI game, bringing a modern and responsive graphical interface with new features.",
      year: 2025,
      role: "Full-stack Developer (Collaboration)",
      status: "Concluded",
      team: [
        "Lucas Leria",
        "Ana Monteiro",
        "Johnathan Carvalho"
      ],
      technologies: [
        "Node.js",
        "Vue.js 3",
        "Vite",
        "Pinia",
        "JavaScript (ES6+)",
        "SCSS",
        "Netlify",
        "GSAP"
      ],
      features: [
        "Interactive guessing game",
        "Multiple difficulty levels (Easy, Medium, Hard)",
        "Leaderboard to track performance",
        "Visual feedback with animations and custom sprites",
        "Responsive design for all devices",
        "Custom themes and fonts",
        "Keyboard navigation and accessibility"
      ],
      highlights: [
        "Collaborative project evolving a classic CLI game into a modern web experience.",
        "Full-stack development with Vue.js 3 and Vite for a fast, component-based frontend.",
        "User experience focused with custom animations, sprites, and responsive design.",
        "Implementation of a centralized state management with Pinia for scalability.",
        "Clean and modular code structure for easy maintenance and future contributions.",
        "Optimized performance and simple deployment with Netlify."
      ],
      challenges: [
        "Migrating from a CLI-based project to a modern web application",
        "Optimizing assets (images, sprites) for performance",
        "Ensuring a fluid and responsive experience across different devices"
      ],
      results: [
        "Functional and deployed game for all audiences",
        "Published documentation",
        "Demonstrates expertise in modern frontend development and collaboration"
      ],
      link: "https://github.com/AnaMonteirodev/mystical-number-castle",
      demo: "https://mysticalnumbercastle.netlify.app/",
      documentation: "https://github.com/AnaMonteirodev/mystical-number-castle/blob/main/README.md"
    },
    {
      name: "The Forca",
      category: 'games',
      seo: "the-forca-hangman-game-web-modern-fastapi-vanilla-javascript-tailwind-css",
      description: "A modern and interactive reimagining of the classic Hangman game, available to play in your browser. This collaborative project combines a Python (FastAPI) backend with a Vanilla JavaScript, Tailwind CSS, and SCSS frontend for a fluid and engaging experience.",
      year: 2025,
      role: "Full-stack Developer (Collaboration)",
      status: "Concluded",
      team: [
        "Lucas Leria",
        "Ana Monteiro"
      ],
      technologies: [
        "Python 3.9+",
        "FastAPI",
        "Vanilla JavaScript",
        "Tailwind CSS",
        "SCSS",
        "HTML5",
        "CSS3",
        "npm",
        "uvicorn"
      ],
      features: [
        "Difficulty selection (Easy, Medium, Hard)",
        "Interactive virtual keyboard",
        "Progressive hangman drawing for immersive feedback",
        "Visual and sound feedback",
        "Local ranking to monitor performance",
        "Fully responsive and accessible interface"
      ],
      highlights: [
        "Collaborative project to modernize a classic command-line game into a full-stack web application.",
        "Developed a RESTful API backend using FastAPI for clean separation of concerns.",
        "Frontend built with Vanilla JavaScript, showcasing a deep understanding of core web technologies.",
        "Implemented a modern, responsive design using Tailwind CSS and SCSS for a visually appealing user experience.",
        "Focus on user experience with progressive feedback and an interactive virtual keyboard.",
        "Clean, modular architecture with clear separation between frontend and backend components."
      ],
      challenges: [
        "Migrating a CLI project to a web-based, full-stack architecture",
        "Ensuring seamless communication between the Python backend and the JavaScript frontend",
        "Managing real-time visual updates based on game state without a complex framework"
      ],
      results: [
        "Fully functional and deployed web game",
        "Clear project documentation for easy contribution and understanding",
        "Demonstration of full-stack development skills and collaborative project management"
      ],
      link: "https://github.com/AnaMonteirodev/The_Forca",
      demo: "https://the-forca.vercel.app/",
      documentation: "https://github.com/AnaMonteirodev/The_Forca/blob/main/README.md"
    },
    {
      "name": "LerCode",
      category: 'web',
      "seo": "simple-and-efficient-web-application-to-instantly-generate-QR-codes",
      "description": "A web application that provides a free and intuitive solution for generating QR codes instantly.",
      "year": 2025,
      "role": "Full-Stack Developer",
      "status": "Concluded",
      "team": [
        "Lucas Leria"
      ],
      "technologies": [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "QRCode.js",
        "Google Fonts",
        "Responsive Design",
        "Git"
      ],
      "features": [
        "Instant Generation",
        "Multiple Formats (URLs, text, etc.)",
        "Customizable Sizes (200x200, 300x300, 400x400)",
        "High-Quality Download (PNG format)",
        "Responsive Interface (desktop, tablet, mobile)",
        "Automatic Language Detection"
      ],
      "highlights": [
        "Intuitive and free solution for instant QR code generation.",
        "Modern, clean, and professional design with gradients and animations.",
        "High-quality download of QR codes in PNG format.",
        "No registration or installation required for immediate use.",
        "Demonstrates good web development practices with vanilla HTML, CSS, and JS.",
        "Supports multiple languages with automatic language detection."
      ],
      "challenges": [
        "Implementing a responsive interface that works flawlessly across all devices.",
        "Ensuring the QR code generation and download functionality is seamless and bug-free.",
        "Creating an intuitive user experience with smooth animations and a modern look."
      ],
      "results": [
        "Developed a fully functional, easy-to-use QR code generator.",
        "Achieved a modern, responsive, and aesthetically pleasing design.",
        "Successfully implemented key features like customizable sizes and high-quality downloads."
      ],
      "link": "https://github.com/lucasgleria/LerCode",
      "demo": "https://lucasgleria.github.io/LerCode/",
      "documentation": "https://github.com/lucasgleria/LerCode/blob/main/README.md"
    },
    {
      "name": "Portfolio Nathalye Vitoria",
      category: 'web',
      "seo": "Nathalye-Vitorias-professional-portfolio",
      "description": "A modern and responsive web application built to professionally showcase projects, certifications, and technical skills.",
      "year": 2025,
      "role": "Full-Stack Developer",
      "status": "Concluded",
      "team": [
        "Lucas Leria"
      ],
      "technologies": [
        "Next.js 15",
        "React 19",
        "TypeScript 5",
        "Tailwind CSS 4",
        "shadcn/ui",
        "Framer Motion",
        "Zod",
        "Vercel",
        "Git"
      ],
      "features": [
        "Dynamic Dark/Light Theme",
        "Responsive Design",
        "Smooth Animations with Framer Motion",
        "Interactive Project Modals",
        "Detailed Certification View",
        "Optimized SEO"
      ],
      "highlights": [
        "Visually appealing and technically robust portfolio.",
        "Utilizes a modern tech stack (Next.js 15, TypeScript, Tailwind CSS).",
        "Showcases projects and skills in an elegant and interactive way.",
        "Ensures type safety with TypeScript.",
        "Optimized for performance with lazy loading and code splitting.",
        "Includes a functional and responsive contact form."
      ],
      "challenges": [
        "Integrating multiple modern libraries like shadcn/ui and Framer Motion for a cohesive design.",
        "Ensuring complete type safety across the entire application with TypeScript.",
        "Optimizing performance to achieve high scores in Core Web Vitals."
      ],
      "results": [
        "Successfully developed a professional and modern portfolio website.",
        "Showcased technical skills and projects effectively.",
        "Implemented a robust, scalable, and maintainable application with a clean architecture."
      ],
      "link": "https://github.com/lucasgleria/portfolio-nathalye-vitoria/",
      "demo": "https://portfolio-nathalye-vitoria.vercel.app/",
      "documentation": "https://github.com/lucasgleria/portfolio-nathalye-vitoria/blob/main/README.md"
    }
  ]
