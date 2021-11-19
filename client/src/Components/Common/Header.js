import { useEffect, useState } from 'react'
import { logo } from '../../Assets/index.js'
import './index.css'

const Header = () => {
  const [authNavBar, setAuthNavBar] = useState(false)

  // check auth to change header
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      setAuthNavBar(true)
    } else {
      setAuthNavBar(false)
    }
  }, [])

  // removing token when logging out
  const handleLogout = () => {
    localStorage.removeItem('token')
  }

  return (
    <div className='header-container'>
      {authNavBar ? (
        // Signed in
        <div className='header-grid'>
          <div className='header-col1'>
            <a href='/'>
              <img src={logo} width='150' alt='' />
            </a>
            <a href='/dashboard'>
              <p style={{ padding: '0px 1rem' }}>Dashboard</p>
            </a>
          </div>
          <div className='header-col2'>
            <a href='/' onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        // Not signed in
        <div className='header-grid'>
          <a href='/'>
            <img src={logo} width='150' alt='' />
          </a>
          <div className='header-col2'>
            <a href='/login'>Login</a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
