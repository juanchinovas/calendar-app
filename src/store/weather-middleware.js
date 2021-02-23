import { pullForecastWeather } from "../services/weather.service";
import { ACTIONS } from "./events/reducers/event-state-reducer";
import setWeather from "../store/events/actions/set-weather";

const applicableActions = [ACTIONS.ADD_NEW, ACTIONS.MODIFY];

const weatherMiddleware = (store) => (next) => (action) => {
    
    // Middleware only for ADD_NEW and MODIFY actions
    if (!applicableActions.includes(action.type)) {
        return next(action);
    }

    // Not pull the weather info if already was requested previously
    const memoryEventInfo = store.getState().event.data[action.payload.eventDate];
    const cityKey = (action.payload.place || "").trim().toUpperCase();
    if(memoryEventInfo && memoryEventInfo.weather && memoryEventInfo.weather[cityKey] || !cityKey) {
       return next(action);
    }

    // Dispatch first action
    const result = next(action);

    // Getting city weather
    pullForecastWeather(action.payload.eventDate, encodeURIComponent(action.payload.place))
    .then((weather) => {
        const payload = {
            info: {
                [cityKey]: weather
            },
            eventDate: action.payload.eventDate
        };
        store.dispatch(setWeather(payload));
    });

    return result;
}

export default weatherMiddleware;