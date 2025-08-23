import React, { useState, useEffect } from 'react'
import { ExternalLink, FolderOpen, FileText, Mail, Github, Linkedin } from 'lucide-react'
import { ProductionProject } from '../data/productionProjects'

interface ProductionProjectsModalProps {
  showProductionModal: boolean
  setShowProductionModal: (show: boolean) => void
  productionProjects: ProductionProject[]
}

export const ProductionProjectsModal: React.FC<ProductionProjectsModalProps> = ({
  showProductionModal,
  setShowProductionModal,
  productionProjects
}) => {
  const [selectedProject, setSelectedProject] = useState<ProductionProject | null>(null)
  const [showProjectDetails, setShowProjectDetails] = useState(true)

  // Reset selected project when modal is opened
  useEffect(() => {
    if (showProductionModal) {
      setSelectedProject(null)
      setShowProjectDetails(true)
    }
  }, [showProductionModal])

  if (!showProductionModal) return null

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-2 sm:p-4 overflow-hidden">
      <div className="bg-black border border-green-400 rounded-lg w-full max-w-6xl h-[95vh] sm:h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 border-b border-green-400 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
            <h2 className="text-green-400 font-mono text-sm sm:text-lg font-semibold truncate">
              Production Projects • Live Demos 
              {/* • <small className="text-xs sm:text-sm"><i>If some link isnt working, copy and paste in your browser</i></small> */}
            </h2>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setShowProjectDetails(!showProjectDetails)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-mono transition-colors"
            >
              {showProjectDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Project Browser */}
          <div className={`flex-1 flex flex-col min-w-0 ${showProjectDetails ? 'w-[calc(100%-288px)] sm:w-[calc(100%-320px)]' : 'w-full'}`}>
            {/* Browser Header */}
            <div className="bg-gray-900 border-b border-green-400 px-3 sm:px-4 py-2 flex items-center space-x-2 flex-shrink-0">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <button
                  onClick={() => setShowProductionModal(false)}
                  className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors flex-shrink-0"
                  title="Close Projects"
                ></button>
                <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-green-300 font-mono text-xs truncate">
                    {selectedProject ? selectedProject.demo : 'https://lucasgleria.github.io/projects/'}
                  </div>
                </div>
              </div>
              <a
                href={selectedProject ? selectedProject.demo : 'https://lucasgleria.github.io/projects/'}
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
              {selectedProject ? (
                <div className="w-full h-full">
                  <iframe
                    src={selectedProject.demo}
                    className="w-full h-full border-0"
                    title={selectedProject.name}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  />
                </div>    
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 bg-black overflow-y-auto">
                  <div className="text-center max-w-2xl w-full">
                    <h3 className="text-green-400 font-mono text-lg sm:text-xl mb-4">Select a Production Project</h3>
                    <p className="text-green-300 font-mono text-xs sm:text-sm mb-6">
                      Choose a project from the sidebar to view its live demo in this browser viewport.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {productionProjects.slice(0, 6).map((project) => (
                        <div 
                          key={project.name}
                          className="bg-gray-900 border border-green-400 rounded-lg p-3 hover:border-green-300 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedProject(project)
                            setShowProjectDetails(true)
                          }}
                        >
                          <h4 className="text-green-400 font-mono font-bold text-xs sm:text-sm mb-1">
                            {project.name}
                          </h4>
                          <p className="text-green-300 font-mono text-xs mb-2 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-green-400 font-mono text-xs">{project.year}</span>
                            <span className={`px-2 py-1 rounded text-xs font-mono ${
                              project.status === 'In Progress' 
                                ? 'bg-yellow-600 text-yellow-100' 
                                : 'bg-green-600 text-green-100'
                            }`}>
                              {project.status}
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
          {showProjectDetails && (
            <div className="w-72 sm:w-80 bg-gray-900 border-l border-green-400 p-3 sm:p-4 flex flex-col min-w-0 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold">Project Information</h3>
                  <button
                    onClick={() => setShowProjectDetails(false)}
                    className="text-green-400 hover:text-green-300 transition-colors text-lg"
                  >
                    ×
                  </button>
                </div>
                
                {selectedProject ? (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-green-300 font-mono text-xs">Project Name</div>
                        <div className="text-green-200 font-mono text-xs truncate">{selectedProject.name}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <FolderOpen className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-green-300 font-mono text-xs">Status</div>
                        <div className="text-green-200 font-mono text-xs truncate">{selectedProject.status}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Github className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-green-300 font-mono text-xs">Role</div>
                        <div className="text-green-200 font-mono text-xs truncate">{selectedProject.role}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <FolderOpen className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-green-300 font-mono text-xs">Total Projects</div>
                        <div className="text-green-200 font-mono text-xs">{productionProjects.length} Projects</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-green-300 font-mono text-xs">Active Projects</div>
                        <div className="text-green-200 font-mono text-xs">
                          {productionProjects.filter(p => p.status === 'Concluded').length} Completed
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold mb-3">Quick Links</h3>
                <div className="space-y-2">
                  {selectedProject ? (
                    <>
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors font-mono text-xs"
                      >
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Live Demo</span>
                      </a>
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors font-mono text-xs"
                      >
                        <Github className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">GitHub Repository</span>
                      </a>
                      <a
                        href={selectedProject.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors font-mono text-xs"
                      >
                        <FileText className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Documentation</span>
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

              {selectedProject && (
                <>
                  <div className="mb-6">
                    <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold mb-3">Features</h3>
                    <div className="space-y-1">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="text-green-300 font-mono text-xs">
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-green-400 font-mono text-xs sm:text-sm font-semibold mb-3">Team</h3>
                    <div className="space-y-1">
                      {selectedProject.team.map((member, index) => (
                        <div key={index} className="text-green-300 font-mono text-xs">
                          • {member}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="mt-auto pt-4 border-t border-green-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-400 font-mono">Project Viewer</span>
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
            <span className="hidden sm:inline">Use "Hide Details" to focus on project</span>
            <span className="hidden sm:inline">•</span>
            <span>Click projects to view live demos</span>
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