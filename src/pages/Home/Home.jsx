import { React, useContext, useEffect, useRef, useState } from 'react';
import './Home.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { dataPage, dataPoisk, dataSearch, listData } from '../../assets/data/data';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../assets/Context/Context';

function Home() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const navigate = useNavigate();
  const lan = window.localStorage.getItem('language');
  const userId = window.sessionStorage.getItem("userId");
  const [userData, setUserData] = useState([]);

  const user = userData.find((e) => e.id === userId);

  useEffect(() => {
    fetch("https://638208329842ca8d3c9f7558.mockapi.io/user_data", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка при выполнении запроса");
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data); // Логируем полученные данные
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      });
  }, []);

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

  const { korzinka, setKorzinka } = useContext(Context); // Инициализация как пустого массива
  const pushKorzinka = (id) => {
    // Проверяем, есть ли элемент в корзине
    const itemExists = korzinka.some((item) => item.id === id);
    if (itemExists) {
      console.log("Этот элемент уже существует в корзине");
    } else {
      const itemToAdd = listHome.find((item) => item.id === id);
      if (itemToAdd) {
        // Добавляем элемент с полем quantity
        setKorzinka((prevKorzinka) => [
          ...prevKorzinka,
          { ...itemToAdd, quantity: 1 }
        ]);
        console.log("Элемент добавлен в корзину:", itemToAdd);
      }
    }
    console.log("Текущая корзина:", korzinka);
  };
  useEffect(() => {
    try {
      const savedKorzinka = JSON.parse(localStorage.getItem('korzinka')) || [];
      setKorzinka(savedKorzinka);
    } catch (error) {
      console.error('Ошибка чтения из localStorage:', error);
    }
  }, [setKorzinka]);

  useEffect(() => {
    if (korzinka.length > 0) {
      localStorage.setItem('korzinka', JSON.stringify(korzinka));
    }
  }, [korzinka]);

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
                <li key={e.id} onClick={() => navigate(`/products/${e.id}`)}>
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
                      {
                        user ?
                          <button onClick={(event) => {
                            event.stopPropagation() // Предотвращаем срабатывание onClick на <li>
                            pushKorzinka(e.id)
                          }}>
                            {
                              korzinka.some((item) => item.id === e.id) ?
                                <i className="bi bi-cart-check"></i>
                                :
                                <i className="bi bi-cart-plus"></i>
                            }
                          </button> : <button onClick={(event) => {
                            event.stopPropagation(); // Предотвращаем срабатывание onClick на <li>
                            navigate('/signin');
                          }}>
                            {
                              korzinka.some((item) => item.id === e.id) ?
                                <i className="bi bi-cart-check"></i>
                                :
                                <i className="bi bi-cart-plus"></i>
                            }
                          </button>
                      }
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
