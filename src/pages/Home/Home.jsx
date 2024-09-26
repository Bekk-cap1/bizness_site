import { React, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Home.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { dataPage, dataPoisk, dataSearch, listData } from '../../assets/data/data';
import { useNavigate } from 'react-router-dom';

function Home() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [korzinka, setKorzinka] = useState([]); // Инициализация как пустого массива
  const navigate = useNavigate();
  const lan = window.localStorage.getItem('language');

  const [searchData, setSearchData] = useState([]);

  const search__item = (e) => {
    e.preventDefault();
    const elSearch = e.target.elements.inp.value.toLowerCase();

    const filteredData = listData.filter((item) => {
      return (
        item.category.toLowerCase().includes(elSearch) ||
        item[`list_name_${lan}`].toLowerCase().includes(elSearch) ||
        item[`list_text_${lan}`].toLowerCase().includes(elSearch)
      );
    });

    setSearchData(filteredData.slice(0, 9));
  };

  const listHome = searchData.length ? searchData : listData.slice(-10, -1);

  const pushKorzinka = (id) => {
    // Проверяем, есть ли элемент в корзине
    const itemExists = korzinka.some((item) => item.id === id);
    if (itemExists) {
      console.log("Этот элемент уже существует в корзине");
    } else {
      const itemToAdd = listHome.find((item) => item.id === id);
      if (itemToAdd) {
        setKorzinka((prevKorzinka) => [...prevKorzinka, itemToAdd]); // Добавляем элемент в корзину
        console.log("Элемент добавлен в корзину:", itemToAdd);
      }
    }
    console.log("Текущая корзина:", korzinka);
  };

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
              {/* Слайды здесь */}
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
            <h2 className='assort'>Ассортимент</h2>
            <hr />
            <ul>
              {listHome.map((e) => (
                <li key={e.id}>
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
                    {e.image.map((t) => (
                      <SwiperSlide key={t.image_id}><img src={t.image_url} alt="" /></SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="about_product">
                    <h6>{e[`stock_${lan}`]} : {e.stock}</h6>
                    <h2>{e[`list_name_${lan}`]}</h2>
                    <p>{e[`list_text_${lan}`]}</p>
                    <div>
                      <h3>{e[`price_${lan}`]} : {e.price}$</h3>
                      <button onClick={() => pushKorzinka(e.id)}>
                        <i className={korzinka.some((item) => item.id === e.id) ? "bi bi-cart-check" : "bi bi-cart-plus"}></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
