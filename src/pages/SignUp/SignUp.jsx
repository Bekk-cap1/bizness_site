import React, { useState } from "react";
import logo from "./../../assets/image/logo.png";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";

function SignUp() {


  const navigate = useNavigate();
  const registerUser = (e) => {
    e.preventDefault();
    const el = e.target.elements;

    // Проверка, что поля не пустые
    if (
      el.login.value.trim() !== "" &&
      el.email.value.trim() !== "" &&
      el.password.value.trim() !== ""
    ) {
      // Проверка, что пароли совпадают
      if (el.password.value === el.passwordConfirm.value) {
        // Отправка данных на сервер
        fetch("https://638208329842ca8d3c9f7558.mockapi.io/user_data", {
          method: "POST",
          headers: {
            "Content-type": "application/json", // Отправляем данные в формате JSON
            Accept: "application/json", // Сервер должен принимать JSON
            "Access-Control-Allow-Origin": "*", // Разрешаем доступ со всех источников
          },
          body: JSON.stringify({
            email: el.email.value,
            login: el.login.value,
            password: el.password.value,
          }),
        })
          .then((res) => {
            // Проверка статуса ответа от сервера
            if (!res.ok) {
              throw new Error(
                `Ошибка сервера: ${res.status} ${res.statusText}`
              );
            }
            return res.json(); // Преобразуем ответ в JSON
          })
          .then((data) => {
            console.log(); // Логируем данные от сервера

            // Проверка, если сервер вернул success: true
            if (data && data.id) {
              // Очистка инпутов после успешной отправки данных
              el.email.value = "";
              el.login.value = "";
              el.password.value = "";
              el.passwordConfirm.value = "";

              sessionStorage.setItem("userId", data.id);
              navigate('/')
            } else {
              alert("Что-то пошло не так, попробуйте снова.");
            }
          })
          .catch((error) => {
            console.error("Ошибка при отправке данных:", error);
            alert("Произошла ошибка при отправке данных.");
          });
      } else {
        // Если пароли не совпадают
        alert("Пароли не совпадают!");
      }
    } else {
      // Если одно из полей пустое
      alert("Пожалуйста, заполните все поля.");
    }
  };

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Состояния для хранения ошибок стилей (красный или зеленый)
  const [passwordValid, setPasswordValid] = useState(null);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);

  // Состояния для отображения сообщений об ошибке
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Для подтверждения пароля

  // Функция для изменения пароля
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Функция для изменения подтверждения пароля
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  // Проверка пароля при потере фокуса
  const handlePasswordBlur = () => {
    if (password.length < 8) {
      setPasswordValid(false);
      setPasswordError("Пароль должен содержать не менее 8 символов");
    } else {
      setPasswordValid(true);
      setPasswordError("");
    }
  };

  // Проверка подтверждения пароля при потере фокуса
  const handlePasswordConfirmBlur = () => {
    if (passwordConfirm !== password) {
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordValid(true);
    }
  };

  // Стиль для пароля в зависимости от валидности
  const passwordStyle =
    passwordValid === false
      ? { border: "1px solid red" }
      : passwordValid === true
      ? { border: "1px solid green" }
      : {};

  // Стиль для подтверждения пароля
  const confirmPasswordStyle =
    confirmPasswordValid === false || password.length < 8
      ? { border: "1px solid red" }
      : confirmPasswordValid === true
      ? { border: "1px solid green" }
      : {};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Функция для переключения видимости подтверждения пароля
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup">
      <div className="wrapp">
        <form action="#" onSubmit={registerUser} className="form">
          <h2>Sign Up</h2>
          <input type="email" placeholder="Email" name="email" required />
          <input type="text" placeholder="Login" name="login" required />
          <div className="pass">
            <input
              type={showPassword ? "text" : "password"} // Меняем тип на текст или пароль
              placeholder="Password"
              name="password"
              minLength="8"
              maxLength="20"
              required
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur} // Срабатывает, когда поле теряет фокус
              style={passwordStyle} // Применяем стили
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} // В зависимости от состояния меняем иконку
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          {/* Сообщение об ошибке, если пароль слишком короткий */}
          {passwordError && (
            <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>
          )}
          <div className="pass">
            <input
              type={showConfirmPassword ? "text" : "password"} // Меняем тип на текст или пароль
              placeholder="Password Again"
              name="passwordConfirm"
              minLength="8"
              maxLength="20"
              required
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              onBlur={handlePasswordConfirmBlur} // Срабатывает, когда поле теряет фокус
              style={confirmPasswordStyle} // Применяем стили
            />
            <i
              className={`fas ${
                showConfirmPassword ? "fa-eye-slash" : "fa-eye"
              }`} // В зависимости от состояния меняем иконку
              onClick={toggleConfirmPasswordVisibility}
            ></i>
          </div>
          {/* Поле для подтверждения пароля */}
          {/* Сообщение об ошибке, если пароли не совпадают */}
          {confirmPasswordValid === false && (
            <p style={{ color: "red", fontSize: "14px" }}>
              Пароли не совпадают
            </p>
          )}
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
