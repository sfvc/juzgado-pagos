import React from 'react'
import { DarkThemeToggle, Flowbite, Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom'
import Logo from '@/images/logo_CATACAPI_claro.png'

export function DefaultNavbar ({ toggleSidebar }) {
  return (
    <div className='sticky__navbar z-50'>
      <Navbar fluid className='navbar__muni z-50'>
        <Navbar.Brand as={Link} to='/'>
          <img src={Logo} className='mr-3 h-20 sm:h-28' alt='Logito' />
        </Navbar.Brand>
        <div className='flex md:order-2 gap-4'>
          <Flowbite className='navbar__muni'>
            <DarkThemeToggle className='dark:text-gray-400 text-white hover:bg-[#3ec2ff]' />
          </Flowbite>
          <Navbar.Toggle
            onClick={toggleSidebar}
            className='dark:text-gray-400 text-white hover:bg-[#3ec2ff] force-visible'
          />
        </div>
      </Navbar>
    </div>
  )
}

export default DefaultNavbar
