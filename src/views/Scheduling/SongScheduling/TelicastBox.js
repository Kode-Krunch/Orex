import React from 'react'

const TelicastBox = () => {
  const numbersArray = Array.from({ length: 24 }, (_, index) => ({ date: index + 1 }));
  return (
    <div className='telicastBox'>
      <div className='flex'>
        <p>telicast date</p>
        <div className='flex'>{numbersArray.map((item) => (
          <p className='telicast'>{item.date}</p>
        ))}</div>
      </div>
      <div className='flex mt-1'>
        <p>20-Jan THU</p>
        <div className='flex'>{numbersArray.map((item) => (
          <p className='telicast'>{item.date}</p>
        ))}</div>

      </div>
      <div className='flex mt-1'>
        <p>20-Jan THU</p>
        <div className='flex'>{numbersArray.map((item) => (
          <p className='telicast'>{item.date}</p>
        ))}</div>

      </div>
      <div className='flex mt-1'>
        <p>20-Jan THU</p>
        <div className='flex'>{numbersArray.map((item) => (
          <p className='telicast'>{item.date}</p>
        ))}</div>

      </div>

    </div>
  )
}

export default TelicastBox