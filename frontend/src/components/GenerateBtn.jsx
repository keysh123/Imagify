import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
     const {user , showLogin , setShowLogin } = useContext(AppContext)
    const navigate = useNavigate();
  return (
    <>
    <motion.div className='pb-16 text-center'
     initial={{opacity:0.2 , y:100}}
    whileInView={{opacity:1,y:0}}
    transition={{duration :1}}
    viewport={{once: true}}>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>
            See the magic. Try now 
        </h1>
        <button onClick={()=>{
          if(user){
            navigate('/result')
          }
          else{
            setShowLogin(true)
          }
        }} className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500'>
            Generate Image Text 
            <img className='h-6' src={assets.star_group} alt="" />
        </button>
    </motion.div>
    </>
  )
}

export default GenerateBtn