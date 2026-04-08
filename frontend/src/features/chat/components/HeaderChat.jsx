import React from 'react'
import "../style/style.scss"
import Sidebar from './Sidebar'

const HeaderChat = () => {
  return (
    <header>
      <div className='header-sidebar'>
       <Sidebar />
      </div>
      <div className='header-option'>
        <div className="model">
            <h3>Model 2.5</h3>
            <i className="ri-arrow-down-s-line"></i>
        </div>
        <div className="option">
            <i className="ri-more-line"></i>
        </div>
      </div>
    </header>
  )
}

export default HeaderChat