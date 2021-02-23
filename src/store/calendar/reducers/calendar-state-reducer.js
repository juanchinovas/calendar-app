import * as utils from "../../../utils/utils";

const maxColumns = 42; /*7 columns x 6 rows*/
const initialState = {
    maxColumns,
    daysOfTheWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    monthsOfTheYear: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    currentDate: new Date(),
    options: utils.calculateStartDate({ maxColumns })
};


export default function calendarStateReducer(state = initialState, action) {

    switch (action.type) {
        case ACTIONS.PREVIOUS:
            return getPreviousMonth(state);
        case ACTIONS.NEXT:
            return getNextMonth(state);
        default:
            return state;
    }
}

export const ACTIONS = {
    PREVIOUS: "PREVIOUS",
    NEXT: "NEXT"
}

function getPreviousMonth(state) {
    const currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
    if (currentDate.getMonth() === state.currentDate.getMonth()) {
        currentDate.setDate(state.currentDate.getDate())
    }
    return {
        ...state,
        currentDate,
        options: utils.calculateStartDate({currentDate, maxColumns: state.maxColumns })
    };
}

function getNextMonth(state) {
    const currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
    if (currentDate.getMonth() === state.currentDate.getMonth()) {
        currentDate.setDate(state.currentDate.getDate())
    }

    return {
        ...state,
        currentDate,
        options: utils.calculateStartDate({currentDate, maxColumns: state.maxColumns })
    };
}