import React from "react";
import { useSelector } from "react-redux";

import styles from "./reminder-item.module.css";

function ReminderItem({reminder, onDelete, onEdit}) {

    const events = useSelector((state) => state.event.data);
    const placeKey = reminder.place.toUpperCase();
    const eventInfo = (events && events[reminder.eventDate] && events[reminder.eventDate]) || null;

    return (
        <div className={styles.item} style={{borderLeft: `5px solid ${reminder.eventColor}`}}>
            <div>
                <span>{reminder.title}</span>
                <span>at {reminder.eventTime}</span>
                {reminder.place && (<span>in {reminder.place}</span>)}
            </div>
            {eventInfo && eventInfo.weather && eventInfo.weather[placeKey] && (
                <div className={styles.weather_container}>
                    <img alt="Weather icon" src={eventInfo.weather[placeKey].iconUrl} width="50px"/>
                    <span>{eventInfo.weather[placeKey].description.toUpperCase()}</span>
                </div>
            )}
            <div className={styles.controls}>
                <button className="delete btn-delete" onClick={()=>onDelete(reminder)}>Delete</button>
                <button className="btn-primary" onClick={()=>onEdit({...reminder})}>Edit</button>
            </div>
        </div>
    );
}

export default ReminderItem;