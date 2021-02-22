import React from "react";

import "./App.css";
import Calendar from "./components/calendar/calendar";
import FormDialog from "./containers/form-dialog/form-dialog";
import ReminderList from "./containers/reminder-list/reminder-list";
// import cleanError from "../../store/events/actions/clean-error";

import { pullForecastWeather } from "./services/weather.service";

let onDaySelectedEventHandler2 = null;

function App() {
    const [showDialog, setShowDialog] = React.useState(false);
    const [reminder, setReminder] = React.useState({});
    const [selectedReminderDate, setSelectedReminderDate] = React.useState(null);

    const newReminderEventHandler = React.useCallback(eventDate => {
        setReminder({eventDate});
        setShowDialog(true);
    }, [reminder]);

    const onDaySelectedEventHandler = React.useCallback(date => {
        setSelectedReminderDate(date);
    }, [selectedReminderDate]);

    const onEditReminderEventHandler = React.useCallback(reminder => {
        setReminder(reminder);
        setShowDialog(true);
    }, [reminder]);

    const onDialogFormCloseEventHandler = React.useCallback(() => {
        setReminder({});
        setShowDialog(false);
    }, [reminder]);


    onDaySelectedEventHandler2 =  onDaySelectedEventHandler2 || onDaySelectedEventHandler;
    
    console.log("Same func: ", onDaySelectedEventHandler2 === onDaySelectedEventHandler);
    console.log("Same func2: ", onDaySelectedEventHandler2 === onDaySelectedEventHandler2);
/*
    React.useEffect(()=> {
        if (!selectedReminderDate) return;

        pullForecastWeather(selectedReminderDate, encodeURIComponent("Santo Domingo"))
        .then(console.log)
        .catch(console.error);

    }, [selectedReminderDate]);*/

    return (
        <div className="App">
            <header className="App-header">Calendar</header>
            <Calendar
                onAddNewReminderEventHandler={newReminderEventHandler}
                onDaySelectedEventHandler={onDaySelectedEventHandler}
            />
            <FormDialog
                show={showDialog}
                formInfo={ reminder }
                onClose={onDialogFormCloseEventHandler}
            />
            {selectedReminderDate && (
                <footer className="App-footer" aria-live="assertive">
                    <ReminderList
                        selectedDate={selectedReminderDate}
                        onEditReminderEventHandler={onEditReminderEventHandler}
                    />
                </footer>
            )}
        </div>
    );
}

export default App;
