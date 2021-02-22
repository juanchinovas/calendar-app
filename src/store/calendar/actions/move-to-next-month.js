import { ACTIONS } from "../reducers/calendar-state-reducer";

export default function moveToNextMonth() {
    return ({
        type: ACTIONS.NEXT
    });
}