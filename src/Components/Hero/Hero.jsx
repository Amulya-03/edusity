import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'

const Hero = () => {
  return ( 
    <div className='hero container'>
        <div className="hero-text">
            
             <h1>Learning today creates a better tomorrow</h1>

             <p>Our cuttting edge curriculm is designed to empower students with the knowledge skills and Experiences needed to excel in the dynamic field of Education</p>
             <button className='btn'>Explore More <img src={dark_arrow} alt=""/></button>
        
        </div>
    </div>
  )
}

export default Hero