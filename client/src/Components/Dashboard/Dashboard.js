import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import './index.css'

import FirstSection from './FirstSection/Welcome'
import SecondSection from './SecondSection/SecondSection'

const Dashboard = () => {
  const naviage = useNavigate()
  const [username, setUsername] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState([])

  const populateTable = async () => {
    const request = await fetch('http://localhost:8000/directory/contents', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
    const data = await request.json()
    console.log(data)
    setUserData(data.content)
    if (data.status === 'ok') {
      setUsername(data.name)
    } else {
      alert(data.error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        naviage('/login')
      } else {
        populateTable()
      }
    } else {
      naviage('/login')
    }
  }, [showModal])

  return (
    <div>
      <FirstSection
        username={username}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <SecondSection showModal={showModal} userData={userData} />
    </div>
  )
}

export default Dashboard
