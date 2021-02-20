import React from "react";
import styles from "./calendar.module.css";

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
const monthOfTheYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const maxColumns = 42;

function Calendar() {
    const currentDate = new Date(/*2020, 4, 1*/);

    const monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startWeekDay = monthStartDate.getDay();
    monthStartDate.setDate(monthStartDate.getDate() - startWeekDay);

    const monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const endWeekDay = monthEndDate.getDay();
    const totalDaysToEndCurrentMonth = Math.ceil(monthEndDate.getTime() - monthStartDate.getTime()) / (24 * 60 * 60 * 1000);
    if (totalDaysToEndCurrentMonth < maxColumns) {
        monthEndDate.setDate(monthEndDate.getDate() + (maxColumns - totalDaysToEndCurrentMonth));
    }
    

    console.log({
        monthStartDate,
        currentDate,
        monthEndDate,
        startWeekDay,
        endWeekDay,
        'startWeekDay2':weekDays[startWeekDay],
        'endWeekDay2':weekDays[endWeekDay],
        totalDaysToEndCurrentMonth: (totalDaysToEndCurrentMonth + (maxColumns - totalDaysToEndCurrentMonth))
    }, Math.ceil(monthEndDate.getTime() - monthStartDate.getTime()) / (24 * 60 * 60 * 1000));
    
    return (
        <>
            <div className={styles.calendar__header}>
                <button>Previous</button>
                <h4>{monthOfTheYear[currentDate.getMonth()]}</h4>
                <button>Next</button>
            </div>
            <div className={styles.calendar}>
                {weekDays.map((day, i) => (
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
                    <Day 
                        position={i} 
                        currentDate={currentDate}
                        displayDate={i > 0 ? new Date(monthStartDate.setDate(monthStartDate.getDate() + 1)): new Date(monthStartDate.getTime())}
                        key={i} />
                ))}
            </div>
        </>
    );
}

function Day(props) {
    const currentDate = (props.currentDate || new Date());

    const classes = [
        styles.calendar__month_day,
        currentDate.getMonth() !== props.displayDate.getMonth() && "-no_belong_to_current_month",
        [0, 6].includes(props.position % 7) && "-month_weekend",
        (currentDate.getMonth() === props.displayDate.getMonth() 
        && currentDate.getFullYear() === props.displayDate.getFullYear()  
        && currentDate.getDate() === props.displayDate.getDate()) && "-current",
    ].filter(c => c);
    
    return (
        <div
            className={classes.join(" ")}
            data-belong={props.position % 7}
            tabIndex={props.position + 1}
            aria-label={
                `${weekDays[props.position % 7]} ${props.displayDate.getDate()}th, 
                ${monthOfTheYear[props.displayDate.getMonth()]} 
                ${props.displayDate.getFullYear()}`
            }
        >
            <span data-time={props.displayDate.getTime()}>{props.displayDate.getDate()}</span>
            <span data-weather="" style={
                {
                    alignSelf: "center",
                    justifySelf: "center",
                    width: "100%",
                    textAlign: "center",
                    fontSize: "12px"
                }
            }>Cloud</span>
            <div className={styles.controls}>
                <ul>
                    <li>New reminder</li>
                    {/* <li>Del</li>
                    <li>Edi</li> */}
                </ul>
            </div>
        </div>
    );
}

export default Calendar;
