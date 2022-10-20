import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Weather.css";


const Weather = () => {
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    getCity();
  });

  const getCity = () => {
    fetch('http://ip-api.com/json')
      .then((response) => response.json())
      .then((responseJson) => {
        setCity(responseJson.city);
        getWeatherData(responseJson.city);
      })
  }

  const getWeatherData = (currentCity) => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=b70fb7018c77ffb92602ff9a7588e8aa&query=${currentCity}`
      )
      .then((res) => {

        setTemperature(res.data.current.temperature);
        setTime(res.data.current.observation_time);
        setDate(res.data.location.localtime);
        setMaxTemp(res.data.current.wind_speed);
        setMinTemp(res.data.current.weather_descriptions);

      });
  };

  return (
    <>
      <h2 className="my-3">Weather</h2>


      <div className="container weather_container">
        <div className="row">
          <div className="col-md-4">
            <h1 className="city">{city}</h1>
            <p className="date">{date}</p>
            {/* <p className="time">{time}</p> */}
          </div>
          <div className="col-md-4">
            <p className="temp">
              {temperature}
              <sup>&#xb0;c</sup>
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
              alt=""
              className="weather_icon"
            />
            <p className="weather_type">Weather: {minTemp}</p>
          </div>
          <div>
            <p className="temp_wind">
              Wind: {maxTemp} <span className="ml-10">mi/h</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Weather;