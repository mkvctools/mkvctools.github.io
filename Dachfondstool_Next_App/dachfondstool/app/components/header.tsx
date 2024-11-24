"use client"
import React from 'react'
import {useState} from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Link from 'next/link'
import NavButton from './NavButton'
import Image from 'next/image'
import Logo from '@/public/assets/logo/MK-VC-Logo-Stix.png'


const navItems = [
  {
    id:1,
    title: 'Home',
    href: 'https://mk-vc.com'
  },
  {
    id:2,
    title: 'Strategie',
    href: 'https://mk-vc.com/strategie/'
  },
  {
    id:3,
    title: 'Portfolio',
    href: 'https://mk-vc.com/portfolio/'
  },
  {
    id:4,
    title: 'News',
    href: 'https://mk-vc.com/news/'
  },
  {
    id:5,
    title: 'About',
    href: 'https://mk-vc.com/about/'
  },
  {
    id:6,
    title: 'Login',
    href: 'https://mk-vc.investorrelations.center/d/users/sign_in' 

  },
]


const Header = () => {
  const [isOpen,setIsOpen] = useState(false)
  return (
    <header className='min-w-screen h-[80px] bg-white flex items-center justify-between px-[42px] shadow-sm'>
        <Image src={Logo} alt="logo" className='h-[60px] w-auto'/>
        <button type='button' onClick={()=> setIsOpen(true)} className='cursor-pointer'><NavButton className='cursor-pointer bg-green-300'/></button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className=" z-[9998] min-h-screen relative right-0">
        <div className="fixed right-0 top-0 z-[9999] w-[300px]" onClick={()=>setIsOpen(false)}>
          <DialogPanel className="w-[300px] right-0 border-l-2 bg-white min-h-screen">
            <nav>
              <ul className='w-full flex flex-col items-center gap-8'>
                {navItems.map((item)=>(
                <li key={'nav-item-'+item.id} className='text-center'><Link href={item.href} target='_blank' className='p-[0.7rem] leading-[1.6rem] text-[34px] text-center text-black hover:text-[#EA5600]'>{item.title}</Link></li>
                ))}
   
              </ul>
            </nav>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  )
}

export default Header