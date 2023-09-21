import React, { useContext, useEffect, useState } from 'react'
import { dataPage } from '../../assets/data/data'
import './Header.scss'
import User__foto from "../../assets/image/user.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../assets/Context/Context'
import { useRef } from 'react'

function Header() {
  const user__Data = [
    {
      id: 1,
      name: 'Asadbek'
    }
  ]

  const [scrol, setScrol] = React.useState(false)
  const offSet = 100;
  const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

  window.addEventListener('scroll', () => {
    if (getTop() > offSet) {
      setScrol(true)
    } else {
      setScrol(false)
    }
  })

  const local = useLocation()
  const navigate = useNavigate()
  if (local.pathname == '/Home') {
    navigate('/')
  }

  const { language, setLanguage } = useContext(Context)

  const select_langu = (e) => {
    setLanguage(e.target.value)
  }
  window.localStorage.setItem('language', language ? language : 'ru')
  const lan = window.localStorage.getItem('language')


  const [menu, setMenu] = useState(false)
  const men = useRef()
  const menuHam = (e) => {
    setMenu(!menu)
    if (menu) {
      document.body.style.overflow = 'auto'
    }else{
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <div className={scrol ? 'active' : 'header__sass'}>
      <div className="container">
        <div className="header__inner">
          <h1>𝐴𝑖𝑠ℎ𝑒 & 𝑆𝑎𝑓𝑖𝑦𝑒𝑚</h1>
          <ul>
            {
              dataPage?.map((e) => (
                <Link to={`/${e.en}`}><strong>{e[`${language}`]}</strong></Link>
              ))
            }
          </ul>

          <div className='account__login'>
            {/* <div className="account__login__user">
              {
                user__Data?.map((e, i) => (
                  <h4>{e.name}</h4>
                ))
              }
              <img src={User__foto} alt="" />
            </div> */}
            <Link to={"/signin"}><button className='login-btn'>Log In</button></Link>
            <Link to={"/signup"}><button className='login-btn'>Sign Up</button></Link>
            <select id="" onChange={select_langu}>
              <option value="ru" selected={lan == 'ru' ? true : false}>Ru</option>
              <option value="en" selected={lan == 'en' ? true : false}>Eng</option>
            </select>
          </div>
        </div>

        <div className="media">
          <div className="header__inner__media">
            <h1>𝐴𝑖𝑠ℎ𝑒 & 𝑆𝑎𝑓𝑖𝑦𝑒𝑚</h1>

            <p onClick={menuHam}>
              <span ref={men} className={menu ? 'span__active' : ''}></span>
            </p>

          </div>
          <div className={menu ? 'active__menu' : 'none'}>
            <ul>
              {
                dataPage?.map((e) => (
                  <Link to={`/${e.en}`} onClick={()=>setMenu(false)}><strong>{e[`${language}`]}</strong></Link>
                ))
              }
            </ul>
            <div className='account__login'>
              {/* <div className="account__login__user">
                {
                  user__Data?.map((e, i) => (
                    <h4>{e.name}</h4>
                    ))
                  }
                  <img src={User__foto} alt="" />
                </div> */}
              <div className="sign__up__buttons">
                <Link to={"/signin"}><button className='login-btn'>Log In</button></Link>
                <Link to={"/signup"}><button className='login-btn'>Sign Up</button></Link>
              </div>
              <select id="" onChange={select_langu}>
                <option value="ru" selected={lan == 'ru' ? true : false}>Ru</option>
                <option value="en" selected={lan == 'en' ? true : false}>Eng</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header