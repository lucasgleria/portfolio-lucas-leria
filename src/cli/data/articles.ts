export interface Article {
    title: string
    description: string
    url: string
    platform: string
    year: number
    category: string
    readTime: string
  }
  
  export const articles: Article[] = [
    {
      title: "Data Science: How Companies Transform Data into Competitive Advantage — Illustrated",
      description: "An comprehensive exploration of how companies leverage data science to gain competitive advantages, featuring real-world examples and practical insights.",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7361434341228392448", // Precisa pegar a url embbedada
      platform: "LinkedIn",
      year: 2025,
      category: "Data Science",
      readTime: "8 min read"
    }
  ]