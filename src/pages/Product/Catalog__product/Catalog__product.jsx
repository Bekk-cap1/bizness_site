
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
    console.log(url_img);

    const lan = window.localStorage.getItem('language')

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
                                                <span>
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
                                                        <b onClick={() => product !== 1 ? setProduct(product - 1) : ''}>-</b>
                                                        <b>{product}</b>
                                                        <b onClick={() => e.stock > product ? setProduct(product + 1) : ''}>+</b>
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
