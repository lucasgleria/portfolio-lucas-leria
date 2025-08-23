import { CommandContext } from "./types"

export const otherProjects = (context: CommandContext) => {
    const webProjects = [
      {
         name: "Microservices Structure",
         description: "Docker Architecture",
         tech: ["Docker", "Prometheus", "Grafana", "Python", "TypeScript"],
         highlight: "Multi-language microservices architecture with monitoring"
        },
        {
         name: "Structures'nAlgorithms",
         description: "Data Structures Collection",
         tech: ["Python", "Algorithms", "Data Structures", "-", "-"],
         highlight: "Practical challenges for fundamental concepts"
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
}