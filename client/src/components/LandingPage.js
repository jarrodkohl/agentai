import React from 'react';
import GetNewPromptForm from './GetNewPromptForm';
import { useState } from 'react';
// import { Link } from 'react-router-dom';


const LandingPage = () => {
  const [prompt, setPrompt] = useState("")
  const [generatedPrompts, setGeneratedPrompts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const generatePrompt = async (personPlace, action, genre) => {
    setIsLoading(true)
    try {
      const promptText = `as a ${personPlace} create a ${genre} with a goal of ${action}  (max tokens 200)`
      const response = await fetch(`/api/v1/openai/generate-prompt?promptText=${promptText}`)
      const data = await response.json()
      setIsLoading(false)
      return data.prompt
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  const handleGeneratePrompt = async (personPlace, action, genre) => {
    const generatedPrompt = await generatePrompt(personPlace, action, genre)
    setPrompt(generatedPrompt)
  }
  
  return (
    <div className="landing-page-container">
      <div className='generate-prompt-form'>
        <GetNewPromptForm onGeneratePrompt={handleGeneratePrompt} isLoading={isLoading}/>
      </div>
      <div className={`gen-prompt-container ${!prompt ? 'hidden' : ''}`}>
      <p id="gen-animate" className='gen-prompt-box' value={prompt} />
    </div>
    </div>
  )
}

export default LandingPage;
