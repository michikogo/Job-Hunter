import React, { useState } from 'react'

import InvalidInput from './Common/InvalidInput'
import ErrorMessage from './Common/ErrorMessage'
import './index.css'

const LoginForm = () => {
  const initialInput = {
    email: '',
    password: ''
  }
  const [loginInput, setLoginInput] = useState(initialInput)
  const initialChecker = {
    emailChecker: false,
    passwordChecker: false
  }
  const [checkLogin, setCheckLogin] = useState(initialChecker)
  const [errorLogin, setErrorLogin] = useState(false)

  // Changing states
  const onChange = e => {
    const { name, value } = e.target
    setLoginInput(prevState => ({ ...prevState, [name]: value }))
  }
  // Trigger error message if empty
  const isValid = () => {
    if (loginInput.email === '') {
      setCheckLogin(prevState => ({ ...prevState, emailChecker: true }))
    } else {
      setCheckLogin(prevState => ({ ...prevState, emailChecker: false }))
    }
    if (loginInput.password === '') {
      setCheckLogin(prevState => ({ ...prevState, passwordChecker: true }))
    } else {
      setCheckLogin(prevState => ({ ...prevState, passwordChecker: false }))
    }
  }
  // Fetch the account
  const fetchAccount = async () => {
    if (loginInput.email !== '' && loginInput.password !== '') {
      const createData = {
        email: loginInput.email,
        password: loginInput.password
      }
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createData)
      })
      const data = await response.json()
      console.log(data)

      // promise returns user then we redirect
      if (data.user) {
        localStorage.setItem('token', data.user)
        setErrorLogin(false)
        window.location.href = '/dashboard'
      } else {
        setErrorLogin(true)
      }
    }
  }
  const loginUser = event => {
    event.preventDefault()
    isValid()
    fetchAccount()
  }

  return (
    <div className='register-container'>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <div className='login-error'>
        <InvalidInput
          showMessage={errorLogin}
          message='Please check email and/or password'
        />
      </div>
      <form onSubmit={loginUser}>
        <div className='form-input'>
          <label className='register-label'>Email</label>
          <input
            name='email'
            type='email'
            value={loginInput.email}
            className='register-input'
            onChange={onChange}
          />
          <ErrorMessage
            showMessage={checkLogin.emailChecker}
            message='Invalid email'
          />
        </div>
        <div className='form-input'>
          <label className='register-label'>Password</label>
          <input
            name='password'
            type='password'
            value={loginInput.password}
            className='register-input'
            onChange={onChange}
          />
          <ErrorMessage
            showMessage={checkLogin.passwordChecker}
            message='Invalid password'
          />
        </div>
        <div className='register-button'>
          <input type='submit' value='Login' className='custom-button' />
        </div>
      </form>
      <div className='register-question'>
        <p style={{ marginBottom: '0px' }}>Do not have an account?</p>
        <p className='register-redirect'>
          <a href='/register'>Lets Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
