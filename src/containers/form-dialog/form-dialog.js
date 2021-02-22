import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ReminderForm from "../../components/reminder-form/reminder-form";
import addReminder from "../../store/events/actions/add-reminder";
import editReminder from "../../store/events/actions/edit-reminder";
import { formToObject } from "../../utils/utils";
import styles from "./form-dialog.module.css";

function FormDialog({ formInfo, show, onClose }) {
    const errMassage = useSelector(state => state.event.error);
    const [internalState, setInternalState] = React.useState(false);

    const formRef = React.useRef();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if(!errMassage) {
            onClose();
        }
    }, [internalState, errMassage]);

    const formSubmitHandler = event => {
        event.preventDefault();
        
        const {_editId, ...reminder} = formToObject(formRef.current);
        const action = _editId > 0 ? editReminder({_editId, ...reminder}): addReminder(reminder);
        
        dispatch(action);
        setInternalState(!internalState);

        return false;
    };

    return (
        <div
            className={[styles.dialog, show ? "show" : styles.hidden].join(" ")}
            aria-hidden={!show}
        >
            <header className={styles.dialog_header}>
                <h3>New Reminder</h3>
                <button onClick={onClose}>&times;</button>
            </header>
            {errMassage && (
                <div aria-live="polite" className={styles["err-message"]}>
                    {errMassage}
                </div>
            )}
            <form ref={formRef} onSubmit={event => formSubmitHandler(event)}>
                <ReminderForm reminder={formInfo} />
                <footer className={styles.dialog_footer}>
                    <button type="submit" className="btn-primary">
                        { (formInfo._id && "Adit reminder") || "Add reminder"}
                    </button>
                </footer>
            </form>
        </div>
    );
}

export default FormDialog;
