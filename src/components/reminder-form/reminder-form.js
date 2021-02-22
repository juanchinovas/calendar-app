import React from "react";
import styles from "./reminder-form.module.css";

function ReminderForm({ reminder }) {
    const [_id, setId] = React.useState(reminder._id || 0);

    return (
        <div className={styles.form}>
            <div className={styles["form-input"]}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={(reminder && reminder.title) || ""}
                    required="required"
                    maxLength="30"
                    autoFocus
                />
            </div>
            <div className={styles["form-input"]}>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    rows="2"
                    defaultValue={(reminder && reminder.description) || ""}
                    maxLength="100"
                ></textarea>
            </div>
            <div className={styles["form-input"]}>
                <label htmlFor="place">City</label>
                <input
                    type="text"
                    name="place"
                    id="place"
                    defaultValue={(reminder && reminder.place) || ""}
                    required="required"
                />
            </div>
            <div className={styles["form-input"]}>
                <label htmlFor="eventColor">Color</label>
                <input
                    type="color"
                    name="eventColor"
                    id="eventColor"
                    defaultValue={(reminder && reminder.eventColor) || "#232383"}
                />
            </div>
            <section className={styles.row}>
                <div className={styles["form-input"]}>
                    <label htmlFor="eventDate">Date</label>
                    <input
                        type="date"
                        name="eventDate"
                        id="eventDate"
                        disabled="disabled"
                        defaultValue={(reminder && reminder.eventDate) || ""}
                    />
                </div>
                <div className={styles["form-input"]}>
                    <label htmlFor="eventTime">Time</label>
                    <input
                        type="time"
                        name="eventTime"
                        id="eventTime"
                        required="required"
                        defaultValue={(reminder && reminder.eventTime) || ""}
                        onInput={(ev) => setId(parseInt(ev.target.value.replace(":", "")))}
                    />
                </div>
            </section>
            <input type="hidden" name="_id" id="_id" value={_id}/>
            <input type="hidden" name="_editId" id="_editId" defaultValue={reminder._id || -1}/>
        </div>
    );
}

export default ReminderForm;
