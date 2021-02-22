import { ACTIONS } from "../reducers/event-state-reducer";

export default function editReminder(reminder) {
    return ({
        type: ACTIONS.MODIFY,
        payload: reminder
    });
}