import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import './index.css'

import FirstSection from './FirstSection/Welcome'
import SecondSection from './SecondSection/Main'

const Dashboard = () => {
  const naviage = useNavigate()
  const [username, setUsername] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)

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
    const timer = setTimeout(() => {
      setLoading(true)
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
    }, 1000)
    setLoading(false)
    return () => clearTimeout(timer)
  }, [])

  // refresh when another one is added to the list
  useEffect(() => {}, [showModal])
  return (
    <div>
      <FirstSection
        username={username}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <SecondSection
        showModal={showModal}
        userData={userData}
        loading={loading}
      />
    </div>
  )
}

export default Dashboard
