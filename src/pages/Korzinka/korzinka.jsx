import React, {useEffect, useState } from 'react'
import './korzinka.scss'
import { listData } from '../../assets/data/data'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setKorzinka } from '../../features/app/appSlice';

function Basket() {
    const dispatch = useDispatch()
    const korzinka = useSelector(state=> state.app.korzinka)
    const lan = window.localStorage.getItem('language');
    const [count, setCount] = useState(1)
    console.log(korzinka);

    useEffect(() => {
        try {
            const savedKorzinka = JSON.parse(localStorage.getItem('korzinka')) || [];
            dispatch(setKorzinka(savedKorzinka));
        } catch (error) {
            console.error('Ошибка чтения из localStorage:', error);
        }
    }, [setKorzinka]);

    useEffect(() => {
        if (korzinka.length > 0) {
            localStorage.setItem('korzinka', JSON.stringify(korzinka));
        }
    }, [korzinka]);
    // const product = listData.find((item) => item.id == productIdToFind);
    const removeFromKorzinka = (id) => {
        dispatch(setKorzinka((prev) => {
            const updatedKorzinka = prev.filter((item) => item.id !== id);
            localStorage.setItem('korzinka', JSON.stringify(updatedKorzinka)); // Обновление localStorage
            return updatedKorzinka;
        }));
    };


    const updateQuantity = (id, newQuantity) => {
        dispatch(setKorzinka((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        ));
    };

    const [deliver, setDeliver] = useState(false)
    const handlePayment = (event) => {
        event.preventDefault(); // Останавливаем стандартное поведение формы
        setDeliver(true); // Устанавливаем состояние "оплата завершена"
        alert('Оплата успешно завершена! Доставка уже в пути.'); // Сообщение пользователю
        setTimeout(() => setDeliver(false), 5000); // Скрыть сообщение через 5 секунд
    };


    return (
        <div>
            <ul className="basket">
                {korzinka.length !== 0 ?
                    korzinka?.map((e) => (
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
                                    <SwiperSlide key={t.image_id}>
                                        <img src={t.image_url} alt="" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="about_product">
                                <div className='add'>
                                    <button
                                        onClick={() => updateQuantity(e.id, e.quantity - 1)}
                                        disabled={e.quantity === 1}
                                    >
                                        -
                                    </button>
                                    <h6>{e.quantity}</h6>
                                    <button
                                        onClick={() => updateQuantity(e.id, e.quantity + 1)}
                                        disabled={e.quantity === e.stock}
                                    >
                                        +
                                    </button>
                                </div>
                                <h2>{e[`list_name_${lan}`]}</h2>
                                <p>{e[`list_text_${lan}`]}</p>
                                <div className='remove'>
                                    <h3>{e[`price_${lan}`]} : {e.price * e.quantity}$</h3>
                                    <button data-toggle="modal" data-target="#exampleModal"
                                        className="buy-button"
                                    >
                                        Купить
                                    </button>
                                    <button
                                        onClick={() => removeFromKorzinka(e.id)}
                                        className="remove-button"
                                    >
                                        Удалить
                                    </button>
                                </div>

                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Доставка</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form className="form" onSubmit={handlePayment}>
                                                    <input type="text" placeholder="Имя получателя" required />
                                                    <input type="text" placeholder="Введите адрес доставки" required />
                                                    <input type="number" placeholder="Номер телефона" required />
                                                    <input type="number" placeholder="Номер карты" required />
                                                    <input type="number" placeholder="Срок годности" required />
                                                    <input type="number" placeholder="CVV/CVC код" required />
                                                    <h4>Оплатить {e.price * e.quantity}$?</h4>
                                                    <button type="submit" >Оплатить</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                    :
                    <h3 className='bask'>Корзина пуста!</h3>
                }
            </ul>
        </div>
    )
}

export default Basket