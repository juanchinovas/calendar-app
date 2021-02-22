import { ACTIONS } from "../reducers/calendar-state-reducer";

export default function moveToPreviousMonth() {
    return ({
        type: ACTIONS.PREVIOUS
    });
}