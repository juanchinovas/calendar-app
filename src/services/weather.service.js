import { stringToDate } from "../utils/utils";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const APP_KEY = process.env.REACT_APP_APP_KEY;

export function pullForecastWeather(date, city) {
    const dt = stringToDate(date).getTime();
    const weatherUrl = `${BASE_URL}/weather?q=${city}&appid=${APP_KEY}`;
    const forecastUrl= `${BASE_URL}/onecall/timemachine?appid=${APP_KEY}`;
    return fetch(weatherUrl)
            .then(res => res.json())
            .then(weather => {
                const timeMachineUrl = `${forecastUrl}&lat=${weather.coord.lat}&lon=${weather.coord.lon}&dt=${dt/1000-(0*1000)}`;
                return fetch(timeMachineUrl)
                        .then(res => res.json())
                        .then(res => {
                            if (res) {
                                return res.current.weather.pop();
                            }
                            return weather.current.weather.pop()
                        });
            });
}