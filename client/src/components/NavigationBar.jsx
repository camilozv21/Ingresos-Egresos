import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/logo_tdcom.png'

export const NavigationBar = () => {
  return (
    <header className='w-full sticky'>
      <nav className='flex items-center justify-center shadow sm:h-18 md:h-24 pr-2 py-1 pl-2 lg:px-5'>
        <div className='flex items-center pr-6 gap-16'>
          <Link to='/' className='block lg:inline-block lg:mt-0 text-black mt-0 hover:text-opacity-70'>
            <div className=' max-w-xs'>
              <img src={img} alt='Logo de la empresa' className=' w-24 cursor-pointer' />
            </div>
          </Link>
          <Link to='/' className='inline-block px-4 py-2 mt-0 text-xl text-white bg-black hover:bg-opacity-70 rounded'>
            Analiticas y Graficos
          </Link>
        </div>
      </nav>
    </header >
  )
}
