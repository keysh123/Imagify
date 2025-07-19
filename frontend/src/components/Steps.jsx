import React from 'react'
import { assets, stepsData } from '../assets/assets';
import { motion } from "motion/react";
const Steps = () => {
  return (
    <>
    <motion.div className='flex items-center justify-center flex-col my-32'
    initial={{opacity:0.2 , y:100}}
    whileInView={{opacity:1,y:0}}
    transition={{duration :1}}
    viewport={{once: true}}
    >
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>
        <p className='text-lg text-gray-600 mb-8'>Transform Words into Stunning Images</p>

        <div className='space-y-4 w-full max-w-3xl text-sm'>
            {
                stepsData.map((item, index) => {
                    return (
                        <div className='flex items-center gap-4 px-8 py-5 bg-white/20 shadow-md cursor-pointer rounded-lg hover:scale-[1.02] transition-all duration-300' key={index}>
                            <img width={40} src={item.icon} alt="" />
                            <div>
                                <h2 className='text-xl font-medium'>
                                    {item.title}
                                </h2>
                                <p className='text-gray-500'>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    )
                }

            )}
        </div>
    </motion.div>
    
    </>
  )
}

export default Steps