import { CommandContext } from "./types"

export const skills = (context: CommandContext) => {
    const skillCategories = {
        "Programming Languages": ["Python", "JavaScript", "TypeScript", "Java", "PHP", "R", "HTML", "CSS"],
        "AI/ML & Data Science": ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Data Science", "Computer Vision", "NLP", "MLOps", "Power BI"],
        "Web Development": ["React", "Node.js", "Django", "Flask", "FastAPI", "Express.js", "Bootstrap", "Tailwind"],
        "Databases": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "SQLite3"],
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
}