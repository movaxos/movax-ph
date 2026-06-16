import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [currentProject, setCurrentProject] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [selectedStyles, setSelectedStyles] = useState([])
  const [generatedImages, setGeneratedImages] = useState([])

  const resetProject = useCallback(() => {
    setCurrentProject(null)
    setUploadedImage(null)
    setAnalysisResult(null)
    setSelectedStyles([])
    setGeneratedImages([])
  }, [])

  return (
    <AppContext.Provider value={{
      currentProject,
      setCurrentProject,
      uploadedImage,
      setUploadedImage,
      analysisResult,
      setAnalysisResult,
      selectedStyles,
      setSelectedStyles,
      generatedImages,
      setGeneratedImages,
      resetProject,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
