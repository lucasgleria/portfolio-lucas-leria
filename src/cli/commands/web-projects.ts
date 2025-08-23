import { CommandContext } from "./types"


export const webProjects = (context: CommandContext) => {
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
}