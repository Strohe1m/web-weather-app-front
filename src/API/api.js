
export async function getWeather ( place, units = 'metric' ) {
    const url = `${import.meta.env.VITE_API_URL}/weather?city=${place}&units=${units}`
    
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        console.log(responseJson)
        return responseJson
    } catch (e) {
        console.error(e.message)
    }

}
