import React from 'react';
import GetNewPromptForm from './GetNewPromptForm';
import { useState } from 'react';
// import { Link } from 'react-router-dom';


const LandingPage = () => {
  const [prompt, setPrompt] = useState("")
  // const [generatedPrompts, setGeneratedPrompts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [usage, setUsage] = useState(0)

  const generatePrompt = async (userContent) => {
    setIsLoading(true)
    try {
      const promptText = userContent
      const response = await fetch(`/api/v1/openai/generate-prompt?promptText=${promptText}`)
      const data = await response.json()
      setIsLoading(false)
      return data
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  const handleGeneratePrompt = async (userContent) => {
    const {prompt: generatedPrompt, usage: generatedUsage } = await generatePrompt(userContent)
    setPrompt(generatedPrompt)
    setUsage(generatedUsage)
  }
  
  return (
    <div className="landing-page-container">
      <div className='generate-prompt-form'>
        <GetNewPromptForm onGeneratePrompt={handleGeneratePrompt} isLoading={isLoading}/>
      </div>
      <div className='callout'>
      {prompt}
    </div>
    <div className="usage-container">
      <h3>Token Usage</h3>
      <p>Total Tokens: {usage}</p>
    </div>
    </div>
  )
}

export default LandingPage;
