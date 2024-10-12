import React, { useEffect, useState } from "react";
import "./SignIn.scss";
import logo from "./../../assets/image/logo.png";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [userData, setUserData] = useState();
  const [checkText, setCheckText] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://638208329842ca8d3c9f7558.mockapi.io/user_data", {
      method: "GET",
      headers: {
        "Content-type": "application/json", // Тип данных, которые отправляются
        Accept: "application/json", // Тип данных, которые принимаются
        "Access-Control-Allow-Origin": "*", // Разрешение на доступ со всех источников
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка при выполнении запроса");
        }
        return res.json(); // Преобразуем ответ в JSON
      })
      .then((data) => {
        setUserData(data); // Логируем полученные данные
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      });
  },[]);
  const checkUser = (e) => {
    e.preventDefault();
    if (e.target.elements.login.value.trim() !== "" && e.target.elements.password.value.trim() !== "") {
        const user = userData?.find(
            (item) => item.login === e.target.elements.login.value.trim()
        );
        const pass = userData?.find(
            (item) => item.password === e.target.elements.password.value.trim()
        );
        
        if (user && pass) {
            navigate("/");
            sessionStorage.setItem("userId", pass?.id);
        } else {
            setCheckText(true);
        }
    }
  };

  return (
    <div className="signin container">
      <div className="wrapp">
        <form action="#" onSubmit={checkUser}>
          <h2>Sign In</h2>
          <input type="text" placeholder="Login" name="login" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          {checkText == true ? (
            <p style={{ color: "red", fontSize: "14px" }}>
              Такого пользователя не существует
            </p>
          ) : (
            ""
          )}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
