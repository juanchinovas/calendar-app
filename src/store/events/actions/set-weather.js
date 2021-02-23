import { ACTIONS } from "../reducers/event-state-reducer";

export default function setWeather(weatherInfo) {
    return ({
        type: ACTIONS.SET_WEATHER,
        payload: weatherInfo
    });
}