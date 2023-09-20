import Context from '@mui/base/Tabs/TabsContext'
import React, { useContext, useState } from 'react'
import { aboutText } from '../../assets/data/data'
import "./About.scss"

function About() {
 
  // const {language, setLanguage} = useContext(Context)

  return (
    <div>
        <div className="about">
          <div className="about__container">
            <div className="about__container__inner">
              {
                aboutText?.map((e=>(
                  <h3>{e[`text_ru`]}</h3>
                )))
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default About