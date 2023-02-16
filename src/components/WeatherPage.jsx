import React, {useEffect, useState} from 'react';
import './WeatherPage.css';

const WeatherPage = () => {
    const date = new Date();
    const arrayOfDay = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thrusday',
        'Friday',
        'Saturday'
    ];

    const arrayOfMonth = [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const [weather,setWeather] = useState({
        condition: '',
        city: '',
        temp: '',
        humidity: '',
        visibility: '',
        wind: ''
    });

    const [dayInfo] = useState({
        day: arrayOfDay.filter((item, index) => index === date.getDay()),
        date: date.getDate(),
        month: arrayOfMonth.filter((item, index) => index === date.getMonth()),
        year: date.getFullYear()
    })

    const [time, setTime] = useState({
        hour: '',
        minute: '',
        second: '',
    });

    setInterval(function() {
        const date = new Date();
        let time = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }
        setTime(time)
    }, 1000);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }, []);

    function showPosition(position) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=93fa813196cde7d11c2d70ea06c9a3b1`)
        .then(response => response.json())
        .then(data => {
            console.log('data',data)
            let weather = {
                condition: data.weather[0].description,
                city: data.name,
                temp: Math.round(data.main.temp - 273),
                humidity: data.main.humidity,
                visibility: data.visibility,
                wind: data.wind.speed
            }
            setWeather(weather)
        })
    }

    const handleChange = (event)=>
    {
        console.log(event.target.value)
        if(event.target.value) {

            var cityInput = event.target.value;
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=93fa813196cde7d11c2d70ea06c9a3b1`)
            .then(response => response.json())
            .then(data => {
                let weather = {
                    condition: data.weather[0].description,
                    city: data.name,
                    temp: Math.round(data.main.temp - 273),
                    humidity: data.main.humidity,
                    visibility: data.visibility,
                    wind: data.wind.speed
                }
                setWeather(weather)
            })
            .catch(err => console.log(err));
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }
    }

    return (
        <div className='weather-app'>
            <div className='time-day'>
                <p className='timing'>{time.hour} : {time.minute} : {time.second}</p>
                <p className='day'>{dayInfo.day} {dayInfo.date} {dayInfo.month} {dayInfo.year}</p>
            </div>

            <div className='current-weather'>
                {weather.temp}<sup>o</sup>c
            </div>

            <div className='weather-search'>

                <div className='weather-descp'>
                    <i class="fab fa-skyatlas"></i>
                    <p>{weather.condition}</p>
                </div>

                <hr/>

                <div className='searching'>
                    <input type='text' placeholder='Search any city' onChange={handleChange}/>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>

                <div className='details'>
                    <p className='location'>{weather.city}</p>
                    <hr/>
                    <div className='details-row'>
                        <p>Temperature</p>
                        <p>{weather.temp}<sup>o</sup>c</p>
                    </div>
                    <hr/>
                    <div className='details-row'>
                        <p>Humidity</p>
                        <p>{weather.humidity}%</p>
                    </div>
                    <hr/>
                    <div className='details-row'>
                        <p>Visibility</p>
                        <p>{weather.visibility} mi</p>
                    </div>
                    <hr/>
                    <div className='details-row'>
                        <p>Wind</p>
                        <p>{weather.wind} km/h</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherPage