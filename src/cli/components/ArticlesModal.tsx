import React, { useState, useEffect } from 'react'
import { ExternalLink, FileText, Mail, Github, Linkedin } from 'lucide-react'
import { Article } from '../data/articles'

interface ArticlesModalProps {
  showArticlesModal: boolean
  setShowArticlesModal: (show: boolean) => void
  articles: Article[]
}

export const ArticlesModal: React.FC<ArticlesModalProps> = ({
  showArticlesModal,
  setShowArticlesModal,
  articles
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [showArticleDetails, setShowArticleDetails] = useState(true)

  // Reset selected article when modal is opened
  useEffect(() => {
    if (showArticlesModal) {
      setSelectedArticle(null)
      setShowArticleDetails(true)
    }
  }, [showArticlesModal])

  if (!showArticlesModal) return null

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-2 sm:p-4 overflow-hidden">
      <div className="bg-black border border-green-400 rounded-lg w-full max-w-6xl h-[95vh] sm:h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 border-b border-green-400 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
            <h2 className="text-green-400 font-mono text-sm sm:text-lg font-semibold truncate">
              Articles & Publications 
              {/* • <small className="text-xs sm:text-sm"><i>If some link isnt working, copy and paste in your browser</i></small> */}
            </h2>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setShowArticleDetails(!showArticleDetails)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-mono transition-colors"
            >
              {showArticleDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Articles Browser */}
          <div className={`flex-1 flex flex-col min-w-0 ${showArticleDetails ? 'w-[calc(100%-288px)] sm:w-[calc(100%-320px)]' : 'w-full'}`}>
            {/* Browser Header */}
            <div className="bg-gray-900 border-b border-green-400 px-3 sm:px-4 py-2 flex items-center space-x-2 flex-shrink-0">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <button
                  onClick={() => setShowArticlesModal(false)}
                  className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors flex-shrink-0"
                  title="Close Articles"
                ></button>
                <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-green-300 font-mono text-xs truncate">
                    {selectedArticle ? selectedArticle.url : 'https://lucasgleria.github.io/articles/'}
                  </div>
                </div>
              </div>
              <a
                href={selectedArticle ? selectedArticle.url : 'https://lucasgleria.github.io/articles/'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors flex-shrink-0"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Browser Content */}
            <div className="flex-1 bg-black overflow-hidden">
              {selectedArticle ? (
                <iframe
                  src={selectedArticle.url}
                  className="w-full h-full border-0"
                  title={selectedArticle.title}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 bg-black overflow-y-auto">
                  <div className="text-center max-w-2xl w-full">
                    <h3 className="text-green-400 font-mono text-lg sm:text-xl mb-4">Published Articles</h3>
                    <p className="text-green-300 font-mono text-xs sm:text-sm mb-6">
                      Browse through Lucas's published articles and technical writings on various topics.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {articles.slice(0, 6).map((article) => (
                        <div 
                          key={article.title}
                          className="bg-gray-900 border border-green-400 rounded-lg p-3 hover:border-green-300 transition-colors cursor-pointer"
                          onClick={() => setSelectedArticle(article)}
                        >
                          <h4 className="text-green-400 font-mono font-bold text-xs sm:text-sm mb-1 leading-tight">
                            {article.title}
                          </h4>
                          <p className="text-green-300 font-mono text-xs mb-2 line-clamp-2">
                            {article.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-green-400 font-mono text-xs">{article.year}</span>
                            <span className="bg-green-600 text-green-100 px-2 py-1 rounded text-xs font-mono">
                              {article.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Collapsible */}
          {showArticleDetails && (
            <div className="w-72 sm:w-80 bg-gray-900 border-l border-green-400 p-3 sm:p-4 flex flex-col min-w-0 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold">Article Information</h3>
                  <button
                    onClick={() => setShowArticleDetails(false)}
                    className="text-green-400 hover:text-green-300 transition-colors text-lg"
                  >
                    ×
                  </button>
                </div>
                
                {selectedArticle ? (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-green-300 font-mono text-xs">Title</div>
                        <div className="text-green-200 font-mono text-xs truncate">{selectedArticle.title}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-green-300 font-mono text-xs">Platform</div>
                        <div className="text-green-200 font-mono text-xs truncate">{selectedArticle.platform}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-green-300 font-mono text-xs">Category</div>
                        <div className="text-green-200 font-mono text-xs truncate">{selectedArticle.category}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-green-300 font-mono text-xs">Total Articles</div>
                        <div className="text-green-200 font-mono text-xs">{articles.length} Articles</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-green-300 font-mono text-xs">Categories</div>
                        <div className="text-green-200 font-mono text-xs">
                          {[...new Set(articles.map(a => a.category))].map(category => (
                            <div key={category} className="flex items-center space-x-1">
                              <span className="text-green-400">•</span>
                              <span className="truncate">{category}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold mb-3">Quick Links</h3>
                <div className="space-y-2">
                  {selectedArticle ? (
                    <>
                                             <a
                         href={selectedArticle.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors font-mono text-xs"
                       >
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Read Article</span>
                      </a>
                      <a
                        href="https://github.com/lucasgleria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors font-mono text-xs"
                      >
                        <Github className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Author's GitHub</span>
                      </a>
                      <a
                        href="https://linkedin.com/in/lucasleria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors font-mono text-xs"
                      >
                        <Linkedin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Author's LinkedIn</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href="https://github.com/lucasgleria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors font-mono text-xs"
                      >
                        <Github className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">GitHub Profile</span>
                      </a>
                      <a
                        href="https://linkedin.com/in/lucasleria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors font-mono text-xs"
                      >
                        <Linkedin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">LinkedIn Profile</span>
                      </a>
                    </>
                  )}
                </div>
              </div>

              {selectedArticle && (
                <>
                  <div className="mb-6">
                    <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold mb-1">Publication Info</h3>
                    <div className="space-y-1">
                      <div className="text-green-300 font-mono text-xs">
                        • Platform: {selectedArticle.platform}
                      </div>
                      <div className="text-green-300 font-mono text-xs">
                        • Category: {selectedArticle.category}
                      </div>
                      <div className="text-green-300 font-mono text-xs">
                        • Year: {selectedArticle.year}
                      </div>
                      <div className="text-green-300 font-mono text-xs">
                        • Read Time: {selectedArticle.readTime}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold mb-3">Description</h3>
                    <p className="text-green-300 font-mono text-xs leading-relaxed">
                      {selectedArticle.description}
                    </p>
                  </div>
                </>
              )}

              <div className="mt-auto pt-4 border-t border-green-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-400 font-mono">Article Viewer</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400">Online</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-900 border-t border-green-400 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-green-400">
            <span className="hidden sm:inline">Click red dot to close</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Use "Hide Details" to focus on article</span>
            <span className="hidden sm:inline">•</span>
            <span>Click articles to read in browser</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-3 h-3 text-green-400 flex-shrink-0" />
            <span className="text-green-400 font-mono text-xs truncate">lucasgleria@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}