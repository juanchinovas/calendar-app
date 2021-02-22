import { pullForecastWeather } from "../services/weather.service";
import { ACTIONS } from "./events/reducers/event-state-reducer";


const weatherMiddleware = (store) => (next) => (action) => {
    if (action.type !== ACTIONS.ADD_NEW || action.type !== ACTIONS.MODIFY) {
        return next(action);
    }

    const memoryEventInfo = store.event.data[action.payload.eventDate];
    let result = null;
    if(!memoryEventInfo) {
        result = next(action);
    } else {

    }

    // Getting city weather
    pullForecastWeather(action.payload.eventDate, encodeURIComponent(action.payload.place))
    .then((weather) => {
        const newAction = {
            payload: {
                [action.payload.place]: weather,
                eventDate: action.payload.eventDate
            },
            action: ACTIONS.SET_WEATHER
        };
        store.dispatch(newAction);
    })
    .catch(console.error);

    return result;
}

export default weatherMiddleware;