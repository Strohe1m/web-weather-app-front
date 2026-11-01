import styles from './weatherContent.module.css'
import { useState } from 'react';

export function WeatherContent ({ forecast }) {
    const [currentDay, setDay] = useState(forecast.today) 
    
    // const {
    //     today,
    //     yesterday,
    //     tomorow,
    // } = forecast;

    return (
        <div className={ styles.contentContainer }>
            <div className={ styles.daySwitcher }>
                <button onClick={() => setDay(forecast.yesterday)}>yesterday</button>
                <button onClick={() => setDay(forecast.today)}>today</button>
                <button onClick={() => setDay(forecast.tomorow)}>tomorrow</button>
            </div>
            <div className={ styles.tod }> 
                <span className={ styles.date }>{ currentDay.datetime }</span>
                |
                <span>{ currentDay.description }</span>
                <div className={ styles.weatherChunk }>
                    {currentDay.hours.map((hour, idx) => {
                        return <div className={styles.hour} key={idx}>
                            <div className={styles.hourinner}>
                                <span>icon</span>
                                <span>{ hour.datetime.slice(0,5) }</span>
                                <span>{ hour.temp }C</span> 
                                <span>
                                    feels like { hour.feelslike }C 
                                </span>
                            </div>
                        </div>
                    })}
                </div>
            </div>  
            
        </div>
    )
}

export function WeatherContentDummy () {
    return (
        <div>

        </div>
    )
}
