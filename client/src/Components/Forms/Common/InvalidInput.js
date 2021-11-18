import React from 'react'

const InvalidInput = ({ showMessage, message }) => {
  return (
    <div className='login-error'>
      <p className={showMessage ? 'error-message' : 'error-message-hide'}>
        {message}
      </p>
    </div>
  )
}

export default InvalidInput
