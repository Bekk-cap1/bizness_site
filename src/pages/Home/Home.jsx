import { React, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './Home.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import Logo from '../../assets/image/logo.png'


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { dataPage, dataPoisk, dataSearch, listData } from '../../assets/data/data';
import { useNavigate } from 'react-router-dom';
// import { Scrollbar } from "swiper";



function Home() {

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };



  const navigate = useNavigate()


  const lan = window.localStorage.getItem('language')


  const SearchDataList = []
  const [searchData, setSearchData] = useState()

  const search__item = (e, i) => {
    e.preventDefault()


    const elSearch = e.target.elements.inp.value

    listData?.map((e, i) => {
      if (e.category.toLowerCase().includes(elSearch.toLowerCase())) {
        SearchDataList.push(e)
      }
      else if (e[`list_name_${lan}`].toLowerCase().includes(elSearch.toLowerCase())) {
        SearchDataList.push(e)
      }
      else if (e[`list_text_${lan}`].toLowerCase().includes(elSearch.toLowerCase())) {
        SearchDataList.push(e)
      }
    })
    setSearchData(SearchDataList)
  }
  const listHome = []
  if(searchData){
    if(searchData.length !== 0)
    listHome.push(searchData.slice(0,9))
  }
  else{
    listHome.push(listData.slice(-10, -1))
  }
  
  return (                                                
    <div className='home'>
      <div className="home__container">
        <div className="home__container__inner">
          <div className="swipper">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >
              <SwiperSlide><h2><strong>119 000</strong> сум</h2></SwiperSlide>
              <SwiperSlide><h2><strong>119 000</strong> сум</h2></SwiperSlide>
              <SwiperSlide><h2><strong>119 000</strong> сум</h2></SwiperSlide>
              <SwiperSlide><h2><strong>119 000</strong> сум</h2></SwiperSlide>
              <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </div>
          <div className="search">
            <form action="#" onSubmit={search__item}>
              <input name='inp' id='inp_search' placeholder={dataSearch[0][`name_${lan}`]} />
              <button type='submit'>{dataPoisk[0][`name_${lan}`]}</button>
            </form>
          </div>

          <div className="list">
            <h2 className='assort'>Assortiment</h2>
            <hr />
            <ul>
              {
                listHome[0]?.map((e) => (

                  <li onClick={() => navigate(`/products/${e.id}`)}>
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      modules={[Autoplay, Pagination, Navigation]}
                      className="mySwiper"
                    >
                      {
                        e.image.map((t) => (
                          <SwiperSlide id={t.image_id}><img src={t.image_url} alt="" /></SwiperSlide>
                        ))
                      }
                    </Swiper>
                    <div className="about_product">
                      <h6>{e[`stock_${lan}`]} : {e.stock}</h6>
                      <h2>{e[`list_name_${lan}`]}</h2>
                      <p>{e[`list_text_${lan}`]}</p>
                      <h3>{e[`price_${lan}`]} : {e.price}$</h3>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home