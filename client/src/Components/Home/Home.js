import React from 'react'
import { abstract, homeImage } from '../../Assets'
import HomeRegister from './HomeRegister'
import './index.css'

const Home = () => {
  return (
    <div className='home-container'>
      <div>
        <img src={abstract} className='home-abstract' alt='' />
        <h1 className='home-h1'>
          Organize and schedule your job applications with us!
        </h1>
        <img src={homeImage} className='home-image' alt='' />
      </div>
      <div></div>
      <div className='home-register-section'>
        <h3 className='home-form'>
          Sign up now! We love to help you organize your job applications.
        </h3>
        <HomeRegister />
      </div>
    </div>
  )
}

export default Home
