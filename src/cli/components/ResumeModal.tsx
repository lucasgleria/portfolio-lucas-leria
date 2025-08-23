import React, { useState } from 'react'
import { ExternalLink, FileText, User, Briefcase, Award, Mail, Github, Linkedin } from 'lucide-react'

interface ResumeModalProps {
  showResumeModal: boolean
  setShowResumeModal: (show: boolean) => void
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ showResumeModal, setShowResumeModal }) => {
  const resumeUrl = 'https://lucasgleria.github.io/resume/'
  const [showResumeDetails, setShowResumeDetails] = useState(true)

  if (!showResumeModal) return null

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-2 sm:p-4 overflow-hidden">
      <div className="bg-black border border-green-400 rounded-lg w-full max-w-6xl h-[95vh] sm:h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 border-b border-green-400 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
            <h2 className="text-green-400 font-mono text-sm sm:text-lg font-semibold truncate">
              Lucas Leria's Resume 
              {/* • <small className="text-xs sm:text-sm"><i>If some link isnt working, copy and paste in your browser</i></small> */}
            </h2> 
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setShowResumeDetails(!showResumeDetails)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-mono transition-colors"
            >
              {showResumeDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Resume Browser */}
          <div className={`flex-1 flex flex-col min-w-0 ${showResumeDetails ? 'w-[calc(100%-288px)] sm:w-[calc(100%-320px)]' : 'w-full'}`}>
            {/* Browser Header */}
            <div className="bg-gray-900 border-b border-green-400 px-3 sm:px-4 py-2 flex items-center space-x-2 flex-shrink-0">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors flex-shrink-0"
                  title="Close Resume"
                ></button>
                <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-green-300 font-mono text-xs truncate">
                    {resumeUrl}
                  </div>
                </div>
              </div>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors flex-shrink-0"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* iframe Content */}
            <div className="flex-1 bg-white overflow-hidden">
              <iframe
                src={resumeUrl}
                className="w-full h-full border-0"
                title="Lucas Leria's Resume"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </div>

          {/* Sidebar - Collapsible */}
          {showResumeDetails && (
            <div className="w-72 sm:w-80 bg-gray-900 border-l border-green-400 p-3 sm:p-4 flex flex-col min-w-0 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold">Resume Information</h3>
                  <button
                    onClick={() => setShowResumeDetails(false)}
                    className="text-green-400 hover:text-green-300 transition-colors text-lg"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <User className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-green-300 font-mono text-xs">Full Name</div>
                      <div className="text-green-200 font-mono text-xs truncate">Lucas Leria</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Briefcase className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-green-300 font-mono text-xs">Professional Focus</div>
                      <div className="text-green-200 font-mono text-xs truncate">Full Stack Development</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Award className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-green-300 font-mono text-xs">Experience Level</div>
                      <div className="text-green-200 font-mono text-xs truncate">Senior Developer</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors font-mono text-xs"
                  >
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">View Full Resume</span>
                  </a>
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
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold mb-3">Key Skills</h3>
                <div className="space-y-1">
                  <div className="text-green-300 font-mono text-xs">• Full Stack Development</div>
                  <div className="text-green-300 font-mono text-xs">• React & Next.js</div>
                  <div className="text-green-300 font-mono text-xs">• TypeScript & JavaScript</div>
                  <div className="text-green-300 font-mono text-xs">• Node.js & Python</div>
                  <div className="text-green-300 font-mono text-xs">• Database Design</div>
                  <div className="text-green-300 font-mono text-xs">• Cloud Architecture</div>
                  <div className="text-green-300 font-mono text-xs">• DevOps & CI/CD</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold mb-3">Experience Highlights</h3>
                <div className="space-y-1">
                  <div className="text-green-300 font-mono text-xs">• 5+ Years in Software Development</div>
                  <div className="text-green-300 font-mono text-xs">• Led Multiple Production Projects</div>
                  <div className="text-green-300 font-mono text-xs">• Mentored Junior Developers</div>
                  <div className="text-green-300 font-mono text-xs">• Published Technical Articles</div>
                  <div className="text-green-300 font-mono text-xs">• Open Source Contributions</div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-green-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-400 font-mono">Resume Viewer</span>
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
            <span className="hidden sm:inline">Use "Hide Details" to focus on resume</span>
            <span className="hidden sm:inline">•</span>
            <span>Click to view full resume</span>
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