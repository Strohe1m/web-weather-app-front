import { getWeather } from "../API/api";
import { useState, useEffect } from "react";
import styles from './weather.module.css'
import { WeatherContent, WeatherContentDummy } from "./weatherContent";

// for loading function
const FRAMES = ['|', '/', '-', '\\'] 

const months = {
    1  : 'January',
    2  : 'February',
    3  : 'March',
    4  : 'April',
    5  : 'May',
    6  : 'June',
    7  : 'July',
    8  : 'August',
    9  : 'September',
    10 : 'October',
    11 : 'November',
    12 : 'December',
}


export default function Weather () {
    const [city, setCity] = useState('');
    const [weatherContent, setWeatherContent] = useState(<WeatherContentDummy />)
    const [humidity, setHumidity] = useState('...')
    const [windspeed, setWindspeed] = useState('...')
    const [pressure, setPressure] = useState('...')
    const [currDate, setCurrDate] = useState('...')
    const [todayTemp, setTodayTemp] = useState('...')
    const [description, setDescription] = useState('...')

    const handleSubmit = async (e) => {
        setWeatherContent(<Loading />)
        e.preventDefault();
        
        try {
            const data = await getWeather(city);
            const days = getWeatherPerDay(data.days);
            const _currDate = days.today.datetime.split('-')

            setCurrDate(`${months[_currDate[1]]} ${_currDate[2]} ${_currDate[0]}`)
            setTodayTemp(days.today.temp)
            setDescription(days.today.description)
            setHumidity(days.today.humidity)
            setWindspeed(days.today.windspeed)
            setPressure(days.today.pressure)

            setWeatherContent(<WeatherContent forecast={days} />);
        } catch (error) {
            console.error("Failed to fetch weather:", error.message);
            
            setWeatherContent(<div className={styles.Loading}>Error loading weather data</div>);
        }

    };

    return (
        <div className={styles.weatherOuter}>
            
            <form 
                className={styles.search}
                onSubmit={handleSubmit}
            >
                <h1>
                    {city}
                </h1>
                <input type="text" 
                    placeholder="search city..." 
                    name="city"
                    onChange={(e) => {setCity(e.target.value)}}
                    />
                <button>forecast</button>
            </form>

            <div className={styles.overAllData}>
                <div className={styles.todayWeather}>
                    <h3>TODAY</h3> 
                    <span>{currDate.split('-')}</span>
                    <span>temperature {todayTemp}C</span>
                    <span>{description}</span>
                </div>
                <div className={styles.todayWeatherOtherData}>
                    <div>
                        <span className="material-icons" style={{
                        fontSize: '28px',
                        display: 'block',
                        width: 'min-content',
                        }}>water_drop</span>
                        <span>
                            Humidity <br />
                            {humidity}%
                        </span>
                    </div>
                    <div>
                        <span className="material-icons" style={{
                        fontSize: '28px',
                        display: 'block',
                        width: 'min-content',
                        }}>air</span>
                        <span>
                            wind speed <br />
                            {windspeed} km/h
                        </span>
                    </div>
                    <div>
                        <span className="material-icons" style={{
                        fontSize: '28px',
                        display: 'block',
                        width: 'min-content',
                        }}>speed</span>
                        <span>
                            Pressure <br />
                            {pressure} hPa
                        </span>
                    </div>
                    
                </div>
            </div>

                {weatherContent}

        </div>
    )
}

/*
<div className={styles.weatherContainerOuter}>
            <div className={styles.weatherFormContainer}>
                <form onSubmit={handleSubmit} className={styles.weatherForm}>
                    <input 
                    type="text" 
                    placeholder="Enter your city..."
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    name="city"
                    id="city"
                    />
                    <button>
                        <h1>
                            see weather
                        </h1>
                    </button>
                </form>
            </div>
            {weatherContent}
        </div>
*/


function getWeatherPerDay ( days ) {
    return {    
        'yesterday': days[0],
        'today': days[1],
        'tomorow': days[2],
    }
}

function Loading () {
    const [pos, setPos] = useState(FRAMES[0]);
    
    
    useEffect(() => {
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % FRAMES.length;
            setPos(FRAMES[currentIndex]);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.loding}>
            {pos}
        </div>
    )

}
