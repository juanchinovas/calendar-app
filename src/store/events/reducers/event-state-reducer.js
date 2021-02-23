import { eventSorter } from "../../../utils/utils";

const initialState = {
    data: {},
    error: ""
};

export default function eventStateReducer(state = initialState, action) {

    switch (action.type) {
        case ACTIONS.ADD_NEW:
            return addNewReminder(state, action);
        case ACTIONS.MODIFY:
            return editReminder(state, action);
        case ACTIONS.DELETE:
            return deleteReminder(state, action);
        case ACTIONS.SET_WEATHER:
            return setWeatherToReminder(state, action);
        case ACTIONS.DELETE_ALL:
            return removeAll(state, action);
        case ACTIONS.CLEAN_ERROR:
            return {
                data: { ...state.data }
            };
        default:
            return state;
    }
}

export const ACTIONS = {
    ADD_NEW: "ADD_NEW",
    DELETE: "DELETE",
    MODIFY: "MODIFY",
    DELETE_ALL: "DELETE_ALL",
    CLEAN_ERROR: "CLEAN_ERROR",
    SET_WEATHER: "SET_WEATHER"
};


function addNewReminder(state, action) {
    let data = state.data[action.payload.eventDate];
    let events = (data && data.reminders) || [];

    const index = events.findIndex(d => d._id === action.payload._id);
    if (index > -1) {
        return {
            error: "There is a reminder at the same time"
        };
    }

    const validationResult = _addAndEditCommonValidations(action.payload);
    if (validationResult) {
        return {
            data: {
                ...state.data
            },
            ...validationResult
        }
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

function deleteReminder(state, action) {
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

function editReminder(state, action) {
    let data = state.data[action.payload.eventDate];
    let events = (data && data.reminders) || []

    if (events) {
        const {_editId, ...reminderInfo} = action.payload;
        const index = events.findIndex(d => d._id === _editId);
        if (index === -1) {
            return {
                error: "Reminder does not exists"
            };
        }

        const validationResult = _addAndEditCommonValidations(action.payload);
        if (validationResult) {
            return {
                data: {
                    ...state.data
                },
                ...validationResult
            }
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

function setWeatherToReminder(state, action) {
    let data = state.data[action.payload.eventDate] || {};
    let currentWeather = data.weather || {};

    return {
        data: {
            ...state.data,
            [action.payload.eventDate]: {
                ...data,
                weather: {...currentWeather, ...action.payload.info}
            }
        }
    };
}

function removeAll(state, action) {
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

function _addAndEditCommonValidations(reminder) {

    if (!reminder.title || reminder.title.trim() === "") {
        return {
            error: "The reminder title is required"
        };
    }

    if (reminder.title.length > 30) {
        return {
            error: "The reminder title must have max of 30 characters"
        };
    }

    if (reminder.description && reminder.description.length > 100) {
        return {
            error: "The reminder description must have max of 100 characters"
        };
    }

    if (!reminder.eventTime || reminder.eventTime.trim() === "") {
        return {
            error: "The event time is required"
        };
    }
}