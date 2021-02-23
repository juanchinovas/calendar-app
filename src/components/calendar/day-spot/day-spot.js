import React from "react";
import { useSelector } from "react-redux";

import styles from "./day-spot.module.css";
import { formatDate } from "../../../utils/utils";

function DaySpot({position, displayDate, currentDate, onAddNewReminder, onSelect, selectedDate}) {
    const isCurrentDay = (currentDate.getFullYear() === displayDate.getFullYear()
                        && currentDate.getMonth() === displayDate.getMonth()
                        && currentDate.getDate() === displayDate.getDate());



    const monthsOfTheYear = useSelector((state) => state.calendar.monthsOfTheYear);
    const daysOfTheWeek = useSelector((state) => state.calendar.daysOfTheWeek);
    const events = useSelector((state) => state.event.data);
    const eventsKey = formatDate(displayDate);

    const classes = [
        styles.calendar__month_day,
        currentDate.getMonth() !== displayDate.getMonth() && "-no_belong_to_current_month",
        [0, 6].includes(position % 7) && "-month_weekend",
        isCurrentDay && "-current",
        selectedDate === eventsKey && styles["-selected"]
    ].filter(c => c);


    return (
        <div
            className={classes.join(" ")}
            data-belong={position % 7}
            tabIndex={position + 1}
            aria-label={`${daysOfTheWeek[position % 7]} ${displayDate.getDate()}th, 
            ${monthsOfTheYear[displayDate.getMonth()]} 
            ${displayDate.getFullYear()}`}
            onClick={() => onSelect && onSelect(eventsKey)}
        >
            <span data-time={displayDate.getTime()}>{displayDate.getDate()}</span>

            {/* {events && events[eventsKey] && events[eventsKey].weather && (
                <span className={styles.calendar__month_day_weather}>{events[eventsKey].weather}</span>
            )} */}
            
            {events && events[eventsKey] && events[eventsKey].reminders && (
                <div className={styles['reminders-container']}>
                    {events[eventsKey].reminders.map( (r, i) => <span title={r.eventTime} key={i} style={{backgroundColor: r.eventColor}}></span>)}
                </div>
            )}
            
            <div className={styles.controls}>
                <ul>
                    <li onClick={(ev)=> {
                        ev.stopPropagation();
                        if (onAddNewReminder) onAddNewReminder(eventsKey);
                        }}><span style={{fontSize: "1.3rem"}}>&#43;</span> reminder</li>
                </ul>
            </div>
        </div>
    );
}

export default DaySpot;