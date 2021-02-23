import { stringToDate } from "../utils/utils";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const APP_KEY = process.env.REACT_APP_APP_KEY;

export function pullForecastWeather(date, city) {
    const weatherUrl = `${BASE_URL}/weather?q=${city}&appid=${APP_KEY}`;
    const forecastUrl = `${BASE_URL}/onecall/timemachine?appid=${APP_KEY}`;
   
    return fetch(weatherUrl)
        .then(res => res.json())
        .then(({weather, coord}) => {
            if (!weather) return Promise.reject(`Could not get weather info`);

            let weatherInfo = weather.pop();
            const dt = stringToDate(date).getTime() / 1000 - (0 * 1000);
            const timeMachineUrl = `${forecastUrl}&lat=${coord.lat}&lon=${coord.lon}&dt=${dt}`;

            return fetch(timeMachineUrl)
                .then(res => res.json())
                .then(res => {
                    if (res && res.current) {
                        weatherInfo = res.current.weather.pop();
                    }
                    weatherInfo.iconUrl = `http://openweathermap.org/img/wn/${weatherInfo.icon}.png`;

                    return weatherInfo;
                });
        });
}
