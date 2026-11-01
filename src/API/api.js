
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


export async function getUserCity() {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by your browser");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
                );
                const data = await response.json();

                const city = data.address.city || data.address.town || data.address.village;
                
                return city;
            } catch (error) {
                console.error("Failed to determine the city:", error.message);
            }
        },
        (error) => {
            console.error("Error getting geolocation:", error.message);
        }
    );
}

