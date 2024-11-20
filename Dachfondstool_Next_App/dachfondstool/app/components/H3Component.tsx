import React from 'react'

interface H3ComponentProps{
    title?: string;
  }

const H3Component: React.FC<H3ComponentProps> = ({title}) => {
  return (
    <h3 className='text-3xl text-center mb-4'>{title}</h3>
  )
}

export default H3Component