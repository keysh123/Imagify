import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext }  from '../context/AppContext'

const Navbar = () => {
   const {user , showLogin , setShowLogin , logout , credit } = useContext(AppContext)
    const navigate = useNavigate();
   
  return (
    <>
    <div className='flex items-center justify-between py-4'>
        <Link to="/">
        <img className='w-28 sm:w-32 lg:w-40'  src={assets.logo} alt="" />
        </Link>
        <div>

            {user ? (
            <div className='flex items-center gap-2 sm:gap-3'>
                <button className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700' onClick={()=>{
                    navigate('/buy-credit')
                }}>
                    <img className='w-5' src={assets.credit_star} alt="" />
                   <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit left : {credit}</p>
                </button>
                <p className='text-gray-600 pl-4 max-sm:hidden'>Hi , {user.name}</p>
                <div className='relative group '>
                    <img className='w-10 drop-shadow' src={assets.profile_icon} alt="" />
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                            <li className='cursor-pointer px-2 py-1 pr-10' onClick={logout}>Logout</li>
                        </ul>
                    </div>
                </div>

            </div>
            ) :(
            <div className='flex items-center gap-2 sm:gap-5'>
               
                <p onClick={()=>{
                    navigate('/buy-credit')
                }} className='cursor-pointer'>Pricing</p>
                <button onClick={()=>{
                    setShowLogin(true)
                }} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-small rounded-full'>Login</button>

            </div>
            )}
        </div>
    </div>
    </>
  )
}

export default Navbar