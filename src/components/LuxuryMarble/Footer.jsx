import React from 'react'

const Footer = () => {
  return (
    <footer className='h-[56vh] w-screen flex flex-col bg-[#5F0000] text-[#D9B57D]' style={{paddingTop:'80px',paddingLeft:'50px',paddingRight:'50px'}}>
      <div className=' top w-full h-1/2 flex'>
        <div className=' top-right w-[34%]'>
<h1 className='text-[50px] font-normal leading-none tracking-normal text-[#D9B57D]' style={{fontFamily: 'Soligant'}}>Exquisite Italian <br />marble makers</h1>
        </div>
        <div className=' top-left w-[66%] flex'>
          <div className='w-1/4 border-l border-[#8B6F47] h-[60%]' style={{padding:'20px'}}>
<h3 className='text-[20px] font-semibold leading-none tracking-[0.02em] uppercase text-[#D9B57D] mb-3' style={{fontFamily: 'Lato'}}>Newsletter</h3>
<p className='text-sm text-[#D9B57D]'>Website Made by AIB Innovations</p>
          </div>
          <div className='w-1/4 border-l border-[#8B6F47] h-[60%]' style={{padding:'20px'}}>
<h3 className='text-[20px] font-semibold leading-none tracking-[0.02em] uppercase text-[#D9B57D] mb-3' style={{fontFamily: 'Lato'}}>Newsletter</h3>
<p className='text-sm text-[#D9B57D]'>Website Made by AIB Innovations</p>
          </div>
          <div className='w-1/4 border-l border-[#8B6F47] h-[60%]' style={{padding:'20px'}}>
<h3 className='text-[20px] font-semibold leading-none tracking-[0.02em] uppercase text-[#D9B57D] mb-3' style={{fontFamily: 'Lato'}}>Newsletter</h3>
<p className='text-sm text-[#D9B57D]'>Website Made by AIB Innovations</p>
<p className='text-sm text-[#D9B57D] mt-2'>Website Made by AIB Innovations</p>
          </div>
          <div className='w-1/4 border-l border-[#8B6F47] h-[60%]' style={{padding:'20px'}}>
<h3 className='text-[20px] font-semibold leading-none tracking-[0.02em] uppercase text-[#D9B57D] mb-3' style={{fontFamily: 'Lato'}}>Connect</h3>
<p className='text-sm text-[#D9B57D]'>Website Made by AIB Innovations</p>
<div className='flex gap-3 mt-4'>
  <span className='text-[#D9B57D]'>f</span>
  <span className='text-[#D9B57D]'>in</span>
  <span className='text-[#D9B57D]'>X</span>
  <span className='text-[#D9B57D]'>Y</span>
</div>
          </div>
        </div>
      </div>
      <div className=' bottom w-full h-1/2 flex flex-col items-center justify-center'>
        <div className='text-center mb-6'>
          <div className='text-[#D9B57D] mb-4'>&#8964;</div>
          <h2 className='text-[64px] font-normal tracking-wider text-[#D9B57D]' style={{fontFamily: 'Soligant'}}>ROCCIA</h2>
        </div>
        <div className='absolute bottom-8 left-12 text-sm text-[#D9B57D]'>
          Copyright © Roccia, Inc 2025 | Privacy Policy
        </div>
      </div>
    </footer>
  )
}

export default Footer
