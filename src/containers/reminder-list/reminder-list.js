import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ReminderItem from "../../components/reminder-item/reminder-item";
import deleteReminder from "../../store/events/actions/delete-reminder";
import deleteAllDayReminders from "../../store/events/actions/delete-all-day-reminders";
import styles from "./reminder-list.module.css";
import { stringToDate } from "../../utils/utils";

function ReminderList({ selectedDate, onEditReminderEventHandler }) {
    const eventsList = useSelector(state => state.event.data);
    const monthsOfTheYear = useSelector((state) => state.calendar.monthsOfTheYear);

    const reminderInfo = eventsList[selectedDate];
    const currentList = (reminderInfo && reminderInfo.reminders) || [];
    const dispatch = useDispatch();

    const _date = stringToDate(selectedDate);
    const calculatedDate = `${monthsOfTheYear[_date.getMonth()]} ${_date.getDate()}th`;

    return (
        <>
            <header style={{ paddingRight: "1.2rem" }}>
                {(currentList && currentList.length > 0) && (
                    <>
                        <h6>Reminders on {calculatedDate}</h6>
                        <button
                            className="btn-delete"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete all the reminders of the day?")) {
                                    dispatch(deleteAllDayReminders(selectedDate));
                                }
                            }}
                        >
                            Delete all
                        </button>
                    </>
                )}
            </header>
            <ul className={styles.list}>
                {currentList &&
                    currentList.map((reminder, i) => (
                        <li key={i}>
                            <ReminderItem
                                reminder={reminder}
                                onDelete={(event) => {
                                    if (window.confirm("Are you sure you want to delete this reminder?")) {
                                        dispatch(deleteReminder(event));
                                    }
                                }}
                                onEdit={onEditReminderEventHandler}
                            />
                        </li>
                    ))}
                {(!currentList || currentList.length === 0) && (
                    <li style={{ textAlign: "center" }}>No reminders on {calculatedDate}</li>
                )}
            </ul>
        </>
    );
}

export default ReminderList;
