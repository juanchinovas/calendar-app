import { ACTIONS } from "../reducers/event-state-reducer";

export default function CleanErrors() {
    return ({
        type: ACTIONS.CLEAN_ERROR
    });
}