import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import './index.css'

import Welcome from './FirstSection/Welcome'
import Main from './SecondSection/Main'

const Dashboard = () => {
  const [username, setUsername] = useState('') // fetched username is stored here
  const [showModal, setShowModal] = useState(false) // bool to know if the modal is seen
  const [userData, setUserData] = useState([]) // fetched data is stored here
  const [loading, setLoading] = useState(false) // Showing loading image if loading
  const [regenerate, setRegenerate] = useState(false) // refresh function for rerendering

  // Get data and username
  const populateTable = async () => {
    const request = await fetch('http://localhost:8000/directory/contents', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
    const data = await request.json()
    // console.log(data)
    setUserData(data.content)
    if (data.status === 'ok') {
      setUsername(data.name)
    } else {
      alert(data.error)
    }
  }
  // rerendering and fetch data every refresh and modal state
  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      } else {
        populateTable()
      }
    } else {
      window.location.href = '/login'
    }
  }, [regenerate, showModal])

  return (
    <div>
      <Welcome
        username={username}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Main
        regenerate={regenerate}
        setRegenerate={setRegenerate}
        showModal={showModal}
        userData={userData}
        loading={loading}
      />
    </div>
  )
}

export default Dashboard
