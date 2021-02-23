import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./calendar.module.css";
import moveToNextMonth from "../../store/calendar/actions/move-to-next-month";
import moveToPreviousMonth from "../../store/calendar/actions/move-to-previous-month";
import DaySpot from "./day-spot/day-spot";

function Calendar({ onAddNewReminderEventHandler, onDaySelectedEventHandler }) {
    const [selectedDate, setSelectedDate] = React.useState("");
    const currentDate = useSelector((state) => state.calendar.currentDate);
    const maxColumns = useSelector((state) => state.calendar.maxColumns);
    const monthsOfTheYear = useSelector((state) => state.calendar.monthsOfTheYear);
    const daysOfTheWeek = useSelector((state) => state.calendar.daysOfTheWeek);

    let { monthStartDate } = useSelector((state) => state.calendar.options);
    
    const dispatch = useDispatch();
    const trickDate = new Date(monthStartDate.getTime());

    return (
        <>
            <div className={styles.calendar__header}>
                <button onClick={()=>dispatch(moveToPreviousMonth())}>Prev</button>
                <h4>{monthsOfTheYear[currentDate.getMonth()] + ' ' + currentDate.getFullYear()}</h4>
                <button onClick={()=>dispatch(moveToNextMonth())}>Next</button>
            </div>
            <div className={styles.calendar}>
                {daysOfTheWeek.map((day, i) => (
                    <div
                        className={styles.calendar__week_day}
                        key={i}
                        data-day-position={i}
                        data-header={true}
                    >
                        {day}
                    </div>
                ))}
                {Array.from({ length: maxColumns }).map((_, i) => (
                    <DaySpot 
                        position={i} 
                        currentCalendarDate={currentDate}
                        displayDate={i > 0 ? new Date(trickDate.setDate(trickDate.getDate() + 1)): new Date(trickDate.getTime())}
                        key={i}
                        onAddNewReminder={onAddNewReminderEventHandler}
                        onSelect={(date) => {
                            onDaySelectedEventHandler(date);
                            setSelectedDate(date);
                        }}
                        selectedDate={selectedDate} />
                ))}
            </div>
        </>
    );
}

export default React.memo(Calendar);
