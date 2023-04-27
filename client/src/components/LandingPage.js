import React from 'react';
import GetNewPromptForm from './GetNewPromptForm';
import { useState } from 'react';
// import { Link } from 'react-router-dom';


const LandingPage = () => {
  const [prompt, setPrompt] = useState("")
  const [generatedPrompts, setGeneratedPrompts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const generatePrompt = async (userContent) => {
    setIsLoading(true)
    try {
      const promptText = userContent
      const response = await fetch(`/api/v1/openai/generate-prompt?promptText=${promptText}`)
      const data = await response.json()
      setIsLoading(false)
      return data.prompt
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  const handleGeneratePrompt = async (userContent) => {
    const generatedPrompt = await generatePrompt(userContent)
    setPrompt(generatedPrompt)
  }
  
  return (
    <div className="landing-page-container">
      <div className='generate-prompt-form'>
        <GetNewPromptForm onGeneratePrompt={handleGeneratePrompt} isLoading={isLoading}/>
      </div>
      <div className='callout'>
      {prompt}
    </div>
    </div>
  )
}

export default LandingPage;
