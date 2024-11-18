import React from 'react'
import NavButton from './NavButton'
import Image from 'next/image'
import Logo from '@/public/assets/logo/MK-VC-Logo-Stix.png'

const Header = () => {
  return (
    <header className='min-w-screen h-[80px] bg-white flex items-center justify-between px-[42px] shadow-sm'>
        <Image src={Logo} alt="logo" className='h-[60px] w-auto'/>
        <NavButton/>
    </header>
  )
}

export default Header