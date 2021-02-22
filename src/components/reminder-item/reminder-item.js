import React from "react";

import styles from "./reminder-item.module.css";

function ReminderItem({reminder, onDelete, onEdit}) {
    return (
        <div className={styles.item} style={{borderLeft: `5px solid ${reminder.eventColor}`}}>
            <div>
                <span>{reminder.title}</span>
                <span>at {reminder.eventTime}</span>
                <span>on {reminder.place}</span>
            </div>
            <div className={styles.controls}>
                <button className="delete btn-delete" onClick={()=>onDelete(reminder)}>Delete</button>
                <button className="btn-primary" onClick={()=>onEdit({...reminder})}>Edit</button>
            </div>
        </div>
    );
}

export default ReminderItem;