export interface PortfolioData {
    name: string
    title: string
    about: string
    contact: {
      email: string
      github: string
      linkedin: string
    }
  }
  
  export const portfolioData: PortfolioData = {
    name: "Lucas Gomes Leria",
    title: "IT Technician | DBA | Full-Stack Developer | Studying AI & Data Science",
    about: "Professional with strong interest in Data Science and Data Analysis, with a background in Database Management, complemented by experience as an IT Technician. With a solid foundation in Python and SQL, I am ready to develop and implement Machine Learning models, explore Artificial Intelligence (AI) solutions, and optimize data pipelines and ETL processes aimed at driving strategic decision-making. My proactivity, combined with a continuous pursuit of challenges and focus on execution, ensures constant learning and the delivery of measurable contributions to innovation and the success of data-driven teams.",
    contact: {
      email: "lucasleria17@gmail.com",
      github: "https://github.com/lucasgleria",
      linkedin: "https://www.linkedin.com/in/lucasleria"
    }
  }