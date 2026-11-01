import style from './weatherForm.module.css'

export default function WeatherForm () {
    return (
        <div className={style.greetings}>
            <form action="#">
                <title for="place">enter place</title>
                <input type="text" id="place" placeholder='place' required/>
                <title for="time">enter time</title>
                <input type='date' id="time" placeholder='place'/>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}
