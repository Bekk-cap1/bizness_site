import React, { useContext, useEffect } from 'react'
import { dataPage } from '../../assets/data/data'
import './Header.scss'
import User__foto from "../../assets/image/user.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../assets/Context/Context'

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
            <Link to={"/signin"}><button className='login-btn'>signin</button></Link>
            <Link to={"/signup"}><button className='login-btn'>signup</button></Link>
            <select id="" onChange={select_langu}>
              <option value="ru" selected={lan == 'ru' ? true : false}>Ru</option>
              <option value="en" selected={lan == 'en' ? true : false}>Eng</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header