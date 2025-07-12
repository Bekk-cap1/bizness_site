import React, { useEffect, useState, useRef } from "react";
import { dataPage } from "../../assets/data/data";
import "./Header.scss";
import User__foto from "../../assets/image/user.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../features/app/appSlice";

function Header() {
  const userId = window.sessionStorage.getItem("userId");
  const [userData, setUserData] = useState([]);
  const [scrol, setScrol] = useState(false);
  const [menu, setMenu] = useState(false);

  const dispatch = useDispatch()
  const language = useSelector(state=>state.app.language)  


  const offSet = 100;
  const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

  const men = useRef();
  const navigate = useNavigate();
  const local = useLocation();


  // Обработка скролла для изменения стилей хедера
  useEffect(() => {
    const handleScroll = () => {
      if (getTop() > offSet) {
        setScrol(true);
      } else {
        setScrol(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Загружаем данные пользователя с API
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

  // Перенаправление на главную страницу, если текущий путь "/Home"
  useEffect(() => {
    if (local.pathname === "/Home") {
      navigate("/");
    }
  }, [local, navigate]);

  // Переключение языка
  const select_langu = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
    window.localStorage.setItem("language", selectedLanguage);
  };

  // Переключение меню на мобильных устройствах
  const menuHam = () => {
    setMenu(!menu);
    document.body.style.overflow = menu ? "auto" : "hidden";
  };

  const user = userData.find((e) => e.id === userId);

  return (
    <div className={scrol ? "active" : "header__sass"}>
      <div className="container">
        <div className="header__inner">
          <h1>𝐴𝑖𝑠ℎ𝑒 & 𝑆𝑎𝑓𝑖𝑦𝑒𝑚</h1>
          <ul>
            {dataPage?.map((e) => (
              <Link key={e.en} to={`/${e.en}`}>
                <strong>{e[`${language}`]}</strong>
              </Link>
            ))}
          </ul>

          <div className="account__login">
            {user ? (
              <div className="account__login__user">
                <button onClick={()=>navigate('/korzinka')} className="basket__btn ">В корзину <i class="bi bi-basket"></i></button>
                <h4>{user.login}</h4>
                <img src={User__foto} alt="User" />
              </div>
            ) : (
              <div className="signin__signup">
                <Link to="/signin">
                  <button className="login-btn">Log In</button>
                </Link>
                <Link to="/signup">
                  <button className="login-btn">Sign Up</button>
                </Link>
              </div>
            )}

            <select value={language} onChange={select_langu}>
              <option value="ru">Ru</option>
              <option value="en">Eng</option>
            </select>
          </div>
        </div>

        <div className="media">
          <div className="header__inner__media">
            <h1>𝐴𝑖𝑠ℎ𝑒 & 𝑆𝑎𝑓𝑖𝑦𝑒𝑚</h1>

            <p onClick={menuHam}>
              <span ref={men} className={menu ? "span__active" : ""} />
            </p>
          </div>

          <div className={menu ? "active__menu" : "none"}>
            <ul>
              {dataPage?.map((e) => (
                <Link key={e.en} to={`/${e.en}`} onClick={() => setMenu(false)}>
                  <strong>{e[`${language}`]}</strong>
                </Link>
              ))}
            </ul>

            <div className="account__login">
              <div className="sign__up__buttons">
                <Link to="/signin">
                  <button className="login-btn">Log In</button>
                </Link>
                <Link to="/signup">
                  <button className="login-btn">Sign Up</button>
                </Link>
              </div>
              <select value={language} onChange={select_langu}>
                <option value="ru">Ru</option>
                <option value="en">Eng</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
