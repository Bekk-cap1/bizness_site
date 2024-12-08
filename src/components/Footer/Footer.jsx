import React from 'react'
import './Footer.scss'

import Logo from '../../assets/image/logo.png'
import { useLocation } from 'react-router-dom'

function Footer({style}) {
  const local = useLocation()
  

  return (
    <div className='footer' style={local.pathname == '/korzinka' ? {display: "none"} : {display: "block"}}>
      <div className="footer__container">
        <div className="footer__container__inner">
          <div className="right">
            <img src={Logo} alt="" />
            <h2>𝐴𝑖𝑠ℎ𝑒 & 𝑆𝑎𝑓𝑖𝑦𝑒𝑚</h2>
          </div>
          <div className="left">
            <h4>Мы в соц.сетях</h4>
            <ul>
              <li><a href="https://instagram.com/aisha_safiyem" target='_blank'><i class="bi bi-instagram"></i></a></li>
              <li><a href="https://t.me/aisha_safiyem" target='_blank'><i class="bi bi-telegram"></i></a></li>
            </ul>
            <h4>Связаться с нами:</h4>
            <a href="tel:998903515111">+998 (90) 381-51-11</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer