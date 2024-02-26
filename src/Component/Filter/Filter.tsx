import React from 'react'
import FilterImage from '../../image/Filters.png'
import "./Filter.css"

const Filter:React.FC = () => {
  return (
    <div className='filterContainer' data-test-id='filterIcon'>
        <img src={FilterImage} alt='filter' />
    </div>
  )
}

export default Filter