import { ACTIONS } from "../reducers/event-state-reducer";

export default function addReminder(reminder) {
    return ({
        type: ACTIONS.ADD_NEW,
        payload: reminder
    });
}