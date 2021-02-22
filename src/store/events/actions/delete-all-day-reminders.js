import { ACTIONS } from "../reducers/event-state-reducer";

export default function deleteAllDayReminders(reminderDate) {
    return ({
        type: ACTIONS.DELETE_ALL,
        payload: reminderDate
    });
}