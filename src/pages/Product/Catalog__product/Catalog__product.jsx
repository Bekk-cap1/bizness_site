
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../components/Header/Header'
import './Catalog__product.scss'
import logo from '../../../assets/image/logo.png'
import { Context } from '../../../assets/Context/Context'
import { listData, opisanie } from '../../../assets/data/data'
import Footer from '../../../components/Footer/Footer'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

function Catalog__product() {
    const catRef = useRef()
    const [url_img, setUrl_img] = useState(0)
    const [product, setProduct] = useState(1)
    const [id, setId] = useState()

    const local = useLocation()
    const navig = local.pathname.split('/products/').join('')

    const lan = window.localStorage.getItem('language')


    const [searchData, setSearchData] = useState()


  const userId = window.sessionStorage.getItem("userId");

    const navigate = useNavigate()
    const [userData, setUserData] = useState([]);
    const listHome = searchData?.length ? searchData : listData.slice(-15, -5);
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
    const { korzinka, setKorzinka } = useContext(Context); // Инициализация как пустого массива
    useEffect(() => {

    }, [korzinka]);
    const pushKorzinka = (id) => {
        setKorzinka((prevKorzinka) => {
            // Проверяем, есть ли элемент в текущем состоянии корзины
            const itemExists = prevKorzinka.some((item) => item.id === id);
            if (itemExists) {
                console.log("Этот элемент уже существует в корзине");
                return prevKorzinka; // Возвращаем корзину без изменений
            } else {
                const itemToAdd = searchData?.length ? searchData.find((item) => item.id === id) : listData.find((item) => item.id === id);
                if (itemToAdd) {
                    console.log("Элемент добавлен в корзину:", itemToAdd);
                    return [...prevKorzinka, { ...itemToAdd, quantity: 1 }];
                }
            }
            return prevKorzinka; // Возвращаем корзину без изменений, если ничего не найдено
        });
    };

    return (
        <>
            <div className='header__product'>
                <div className="container">
                    <div className="product__inner">
                        <div>

                            <div className='product__right'>
                                {
                                    listData?.map((e, i) => (
                                        navig == e.id ?
                                            <img src={e.image[url_img].image_url} alt="" />
                                            : ''
                                    ))

                                }
                            </div>
                            <div className='product__main'>
                                {
                                    listData?.map((e, i) => (
                                        navig == e.id ?

                                            <>
                                                <h2>{e[`list_text_${lan}`]}</h2>
                                                <span className='stocks'>
                                                    <h6>{e[`stock_${lan}`]}: <strong>{e.stock}</strong></h6>
                                                </span>
                                                <hr />
                                                {
                                                    opisanie?.map((q) => (
                                                        <h3>
                                                            {q[`name_${lan}`]}
                                                        </h3>
                                                    ))
                                                }
                                                <p>{e[`product_text_${lan}`]}</p>
                                                <hr />
                                                <span>
                                                    <h2>{e[`price_${lan}`]}:</h2>
                                                    <b>{((e.price - (e.forsell !== null ? e.price * e.forsell / 100 : e.price)) * product).toFixed(1)} $</b>
                                                    <h4>{(e.forsell !== 0 ? e.price : '') + '$'}</h4>
                                                </span>
                                            </> : ''
                                    ))
                                }
                                <div>
                                    <span className='span__div'>
                                        {
                                            listData?.map((e) => (
                                                navig == e.id ?
                                                    <>
                                                        {
                                                            user ?
                                                                <button onClick={(event) => {
                                                                    event.stopPropagation() // Предотвращаем срабатывание onClick на <li>
                                                                    pushKorzinka(e.id)
                                                                }}>{korzinka.some((item) => item.id === e.id)
                                                                    ? 'Товар в корзине'  // Текст кнопки после добавления товара
                                                                    : 'Добавить в корзину'}
                                                                    <i className={korzinka.some((item) => item.id === e.id) ? "bi bi-cart-check" : "bi bi-cart-plus"}></i>
                                                                </button> : <button onClick={(event) => {
                                                                    event.stopPropagation(); // Предотвращаем срабатывание onClick на <li>
                                                                    navigate('/signin');
                                                                }}> {korzinka.some((item) => item.id === e.id)
                                                                    ? 'Товар в корзине'  // Текст кнопки после добавления товара
                                                                    : 'Добавить в корзину'}
                                                                    <i className={korzinka.some((item) => item.id === e.id) ? "bi bi-cart-check" : "bi bi-cart-plus"}></i>
                                                                </button>
                                                        }
                                                    </>
                                                    : ''
                                            ))
                                        }
                                    </span>
                                </div>
                                <hr />
                                <div className='podel'>
                                    <h5>Поделиться</h5>
                                    <img src={logo} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='product__left'>
                            <div >
                                <ul ref={catRef}>
                                    {
                                        listData?.map((e, i) => (
                                            navig == e.id ?
                                                <Swiper
                                                    slidesPerView={5}
                                                    spaceBetween={20}
                                                    freeMode={true}
                                                    pagination={{
                                                        clickable: true,
                                                    }}
                                                    modules={[FreeMode, Pagination]}
                                                    className="mySwiper"
                                                >
                                                    {e.image.map((q, i) => (
                                                        <SwiperSlide onClick={() => setUrl_img(i)}>
                                                            <img src={q.image_url} alt="" />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                                : ''
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className='opisaniye'>
                        <div>
                            {
                                opisanie?.map((e) => (
                                    <h2>{e[`name_${lan}`]}</h2>
                                ))
                            }
                            {
                                listData?.map((e) => (
                                    navig == e.id ?
                                        < p > {e[`text_product_${lan}`]}
                                        </p> : ''
                                ))
                            }
                        </div>
                    </div>
                    <hr />

                    <div>
                        {/* {
                            listData?.map((e, i) => (
                                navig == e.id ? 
                                            
                            ))
                        } */}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Catalog__product
