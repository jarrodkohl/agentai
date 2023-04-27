import React, { useState } from 'react';

const GetNewPromptForm = ({ onGeneratePrompt, isLoading }) => {
  const [userContent, setContent] = useState('');
  

  const handleSubmit = (event) => {
    event.preventDefault()
    onGeneratePrompt(userContent)
  }

  const buttonText = isLoading ? 'Loading...' : 'Generate Content'

  return (
    <form  onSubmit={handleSubmit}>
      <div className='new-prompt-form-container'>
        <label>
          <input className='new-prompt-form-input' type="text" value={userContent} placeholder="lets get social" onChange={(event) => setContent(event.target.value)} />
        </label>
      </div>
      <div>
        <button className='gen-btn button orange-btn' type="submit" disabled={isLoading}>{buttonText}</button>
      </div>
    </form>
  )
};

export default GetNewPromptForm;
