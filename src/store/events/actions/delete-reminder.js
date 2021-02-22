import { ACTIONS } from "../reducers/event-state-reducer";

export default function addReminder(reminder) {
    return ({
        type: ACTIONS.DELETE,
        payload: reminder
    });
}