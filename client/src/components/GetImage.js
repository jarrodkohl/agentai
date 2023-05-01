import React from "react";
import { useState } from 'react';

const GetImage = () => {
  const[generatedImage, setGeneratedImage] = useState('')
  const[isLoading, setIsLoading] = useState(false)
//make new router for get image
//make new fetch to OpenAI API
  const generateImage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/v1/openai/generate-image`)
      const data = await response.json()
      setIsLoading(false)
      return data
    } catch (error) {
      console.error(error)
      return ''
    }
  }



  const handleSubmit = (event) => {
    event.preventDefault()
    onGenerateImage()
  }

  const buttonText = isLoading ? 'Loading...' : 'Generate Image'

  return (
    <form  onSubmit={handleSubmit}>
      <div>
        <button className='gen-btn button orange-btn' type="submit" disabled={isLoading}>{buttonText}</button>
      </div>
    </form>
  )
}

export default GetImage;