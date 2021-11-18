import React from 'react'

const ErrorMessage = ({ showMessage, message }) => {
  return (
    <>
      <div></div>
      <small className={showMessage ? 'error-message' : 'error-message-hide'}>
        {message}
      </small>
    </>
  )
}

export default ErrorMessage
