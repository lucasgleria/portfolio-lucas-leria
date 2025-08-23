import { CommandContext } from "./types"


export const desktopApps = (context: CommandContext) => {
    const webProjects = [
      {
         name: "lleria-medinizer",
         description: "Pharmaceutical CRUD",
         tech: ["Python", "PyQt5/PySide6", "SQLite", "OpenCV", "EasyOCR"],
         highlight: "Advanced OCR with Arduino communication"
        },
        {
         name: "URL Shortener",
         description: "Simple Desktop URL Shortener",
         tech: ["Python", "PyQt6", "Flask", "MongoDB", "PyMongo"],
         highlight: "Desktop GUI with dedicated Flask server"
        },
        {
         name: "Virtual Agenda",
         description: "Task Management System",
         tech: ["Python", "Tkinter", "SQLite", "tkcalendar", "plyer"],
         highlight: "Dashboard and interactive charts"
        },
        {
         name: "Java Inventory Management System",
         description: "Academic Stock Manager for a small business",
         tech: ["Java", "Swing", "MySQL", "JDBC", "Maven"],
         highlight: "CLI and GUI versions with multithreading"
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
}