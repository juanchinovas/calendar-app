import { createStore, combineReducers, applyMiddleware } from "redux";
import calendarStateReducer from "./calendar/reducers/calendar-state-reducer";
import eventStateReducer from "./events/reducers/event-state-reducer";
import weatherMiddleware from "./weather-middleware";


export default function createReduxStore() {
    const combinedReducer = combineReducers({
        "calendar": calendarStateReducer,
        "event": eventStateReducer
    })
    const store = createStore(combinedReducer, applyMiddleware(weatherMiddleware));

    return store;
}