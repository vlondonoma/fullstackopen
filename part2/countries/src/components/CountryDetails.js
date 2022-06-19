import React, { useState, useEffect} from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {
    const [ weather, setWeather ] = useState({
        current: {
            observation_time: "00:00",
            temperature: 0,
            weather_icons: [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png"
            ],
            wind_speed: 0,
            wind_dir: "",
            }   
    })

    useEffect(() => {
        axios
        .get('http://api.weatherstack.com/current?access_key='
            +process.env.REACT_APP_API_KEY
            +'&query='+country.capital)
        .then(response => {
            setWeather(response.data)
        })
    }, [])

    return (
        <>
        <h1>{country.name.common} {country.flag}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        {
            Object.values(country.languages).map(lang => <p>{lang}</p>)
        }
        <h2>Current weather in {country.capital}</h2>
        <p>Time: {weather.current.observation_time}</p>
        <p>Temperature: {weather.current.temperature}</p>
        <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        <img src={weather.current.weather_icons}/>
        </>
    )
}

export default CountryDetails