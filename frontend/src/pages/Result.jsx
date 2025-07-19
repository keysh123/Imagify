import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Result = () => {
  const [image,setImage] = useState(assets.sample_img_1)
  const [isImageLoaded , setIsImageLoaded] = useState(false)
  const [loading , setLoading] = useState(false)
  const [input , setInput] = useState('')

  const onSubmitHandler = async  (e) =>{

  }
  return (
    <>
    <motion.form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'
     initial={{opacity:0.2 , y:100}}
    whileInView={{opacity:1,y:0}}
    transition={{duration :1}}
    viewport={{once: true}}
    >
    <div>
      <div className='relative'>
      <img  src={assets.sample_img_1} alt="" className='max-w-sm rounded'/>
      <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'} `}></span>
      </div>
       
      <p className={!loading ? 'hidden' : ''}>loading ...</p>
      </div>
   

{!isImageLoaded ?  
      <div className='flex w-full max-w-xl bg-neutral-500  text-white text-sm p-0.5 mt-10 rounded-full'>
        <input onChange={(e)=>{
          setInput(e.target.value)
        }}  value={input} className='flex-1 bg-transparent ml-8 outline-none max-sm:w-20 placeholder-style' type="text" placeholder='Describe what you want to generate' />
        <button type='submit' className='bg-zinc-900  rounded-full py-3 px-10 sm:px-16'>Generate</button>
      </div>

:
      <div className='flex flex-wrap gap-2 justify-between text-white text-small p-0.5 mt-10 rounded-full'>
        <p onClick={()=>{
          setIsImageLoaded(false)
        }} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>
          Generate Another
        </p>
        <a download  className='bg-zinc-900 t px-10 py-3 rounded-full cursor-pointer' href={image}>
          Download
        </a>
      </div>
}
      

    </motion.form>
    </>
  )
}

export default Result