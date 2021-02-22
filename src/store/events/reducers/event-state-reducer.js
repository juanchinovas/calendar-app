import { eventSorter } from "../../../utils/utils";

const initialState = {
    data: {},
    error: ""
};

export default function eventStateReducer(state = initialState, action) {
    // Adding
    if (action.type === ACTIONS.ADD_NEW) {
        let data = state.data[action.payload.eventDate];
        let events = (data && data.reminders) || [];

        const index = events.findIndex(d => d._id === action.payload._id);
        if (index > -1) {
            return {
                data: {
                    ...state.data
                },
                error: "There is a reminder at the same time"
            };
        }

        if (!action.payload.title) {
            return {
                data: {
                    ...state.data
                },
                error: "The reminder title is required"
            };
        }

        if (action.payload.title.length > 30) {
            return {
                data: {
                    ...state.data
                },
                error: "The reminder title must have max of 30 characters"
            };
        }

        if (action.payload.description.length > 100) {
            return {
                data: {
                    ...state.data
                },
                error: "The reminder description must have max of 100 characters"
            };
        }

        if (!action.payload.eventTime) {
            return {
                data: {
                    ...state.data
                },
                error: "Please, specify the time of the reminder"
            };
        }

        events.push({
            ...action.payload
        });
        events.sort(eventSorter);

        return {
            data: {
                ...state.data,
                [action.payload.eventDate]: {
                    ...data,
                    reminders: events
                }
            }
        };
    }

    // Deleting
    if (action.type === ACTIONS.DELETE) {
        let data = state.data[action.payload.eventDate];
        let events = (data && data.reminders) || [];

        if (events) {
            const index = events.findIndex(d => d._id === action.payload._id);
            if (index === -1) {
                return {
                    data: {
                        ...state.data
                    },
                    error: "Cannot delete the reminder. Does not exists"
                };
            }
            events.splice(index, 1);
        }

        return {
            data: {
                ...state.data,
                [action.payload.eventDate]: {
                    ...data,
                    reminders: events
                }
            }
        };
    }

    // Modifying
    if (action.type === ACTIONS.MODIFY) {
        let data = state.data[action.payload.eventDate];
        let events = (data && data.reminders) || []

        if (events) {
            const {_editId, ...reminderInfo} = action.payload;
            const index = events.findIndex(d => d._id === _editId);
            if (index === -1) {
                return {
                    data: {
                        ...state.data
                    },
                    error: "Reminder does not exists"
                };
            }

            if (!action.payload.title) {
                return {
                    data: {
                        ...state.data
                    },
                    error: "The reminder title is required"
                };
            }
    
            if (action.payload.title.length > 20) {
                return {
                    data: {
                        ...state.data
                    },
                    error: "The reminder title must have max of 30 characters"
                };
            }
    
            if (action.payload.description.length > 100) {
                return {
                    data: {
                        ...state.data
                    },
                    error: "The reminder description must have max of 100 characters"
                };
            }
    
            if (!action.payload.eventTime) {
                return {
                    data: {
                        ...state.data
                    },
                    error: "Please, specify the time of the reminder"
                };
            }

            events[index] = reminderInfo;

            events.sort(eventSorter);
        }

        return {
            data: {
                ...state.data,
                [action.payload.eventDate]: {
                    ...data,
                    reminders: events
                }
            }
        };
    }

    // Deleting all of the day
    if (action.type === ACTIONS.DELETE_ALL) {
        let data = {};
        if (action.payload) {
            data = {...state.data};
            delete data[action.payload];
        }
        return {
            data,
            error: ""
        };
    }

    // Cleaning error Message
    if (action.type === ACTIONS.CLEAN_ERROR) {
        return {
            data: { ...state.data }
        };
    }

    // Set Weather
    if (action.type === ACTIONS.SET_WEATHER) {
        let data = state.data[action.payload.eventDate];
        let currentWeather = data.weather || {};
        return {
            data: {
                ...state.data,
                [action.payload.eventDate]: {
                    ...data,
                    weather: {...currentWeather, ...action.payload}
                }
            }
        };
    }

    return state;
}

export const ACTIONS = {
    ADD_NEW: "ADD_NEW",
    DELETE: "DELETE",
    MODIFY: "MODIFY",
    DELETE_ALL: "DELETE_ALL",
    CLEAN_ERROR: "CLEAN_ERROR",
    SET_WEATHER: "SET_WEATHER"
};
