import { useState } from 'react'

const Figure = ({ src, children }) => {
  const [full, setFull] = useState(false)
  
  return (
    <div className='relative select-none'>
      {
        full && (
          <div className="z-[100] cursor-pointer fixed w-screen h-screen inset-0 bg-black bg-opacity-70 flex items-center justify-center" onClick={() => setFull(false)}>
            <img src={src} alt={children} className='px-5 w-full sm:w-2/3 xl:w-1/2 cursor-default' />
          </div>
        )
      }
      <figure className="cursor-pointer" onClick={() => setFull(true)}>
        <img src={src} alt={children} className=' mx-auto w-full sm:w-1/2 xl:w-1/3' />
        <figcaption>
          <p className='text-sm w-full'>{children}</p>
        </figcaption>
      </figure>
    </div>
  )
}

export default Figure
