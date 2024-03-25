import React from 'react'

function Pagination({currentPage,onRightClick,onLeftClick}) {
  return (
    <div className='bg-gray-400 p-4 mt-8 flex justify-center'>
      <div className='px-8'><i class="fa-solid fa-arrow-left" onClick={onLeftClick}></i>  </div>
      
      <div className='font-bold'>{currentPage}</div>   

      <div className='px-8'> <i class="fa-solid fa-arrow-right" onClick={onRightClick}></i></div>
     
      
      </div>
  )
}

export default Pagination