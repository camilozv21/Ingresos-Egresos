import React from 'react'
import { Link } from 'react-router-dom'

export const NavigationBar = () => {
  return (
    <header className='w-full sticky'>
      <nav className='flex items-center justify-between shadow sm:h-18 md:h-24 pr-2 py-1 pl-2 lg:px-5'>
        <div className='flex items-center mr-6'>
          <Link to='/' className='block lg:inline-block text-xl lg:mt-0 text-black mt-0 hover:text-opacity-70'>
            Ingresos y Egresos
          </Link>
        </div>
      </nav>
    </header >
  )
}
