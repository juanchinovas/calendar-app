import "@testing-library/jest-dom";

import { createStore, applyMiddleware, combineReducers } from "redux";
import eventStateReducer from "./event-state-reducer";
import addReminder from "../actions/add-reminder";
import weatherMiddleware from "../../weather-middleware";


describe("Reminder/Event state reducer", () => {

    let store = null;

    beforeEach( ()=> {
        store = createStore(
            combineReducers({event: eventStateReducer}), 
            applyMiddleware(weatherMiddleware));
    });

    test(`When adding a new reminder with an empty title, should not be saved`, () => {

        const reminder = {
            title: "",
            description: "",
            place: "",
            eventColor: "#232383",
            eventDate: "",
            eventTime: "",
            _id: -1
        };

        store.dispatch(addReminder(reminder));
        
        expect(store.getState().event.error).toBe("The reminder title is required");
        expect(store.getState().event.data).toMatchObject({});
    });

    test(`When adding a new reminder with an null title, should not be saved`, () => {

        const reminder = {
            title: null,
            description: "",
            place: "",
            eventColor: "#232383",
            eventDate: "",
            eventTime: "",
            _id: -1
        };

        store.dispatch(addReminder(reminder));
        
        expect(store.getState().event.error).toBe("The reminder title is required");
        expect(store.getState().event.data).toMatchObject({});
    });

    test(`When adding a new reminder with a title with more than 30 characters, should not be saved`, () => {

        const reminder = {
            title: "Meeting with the Rosetta's team to debate about the news features for the new app",
            description: "",
            place: "",
            eventColor: "#232383",
            eventDate: "",
            eventTime: "",
            _id: -1
        };

        store.dispatch(addReminder(reminder));

        expect(store.getState().event.error).toBe("The reminder title must have max of 30 characters");
        expect(store.getState().event.data).toMatchObject({});
    });

    test(`When adding a new reminder with an empty event time, should not be saved`, () => {

        const reminder = {
            title: "Meeting with the Rosetta team",
            description: "",
            place: "",
            eventColor: "#232383",
            eventDate: "2021-02-28",
            eventTime: "",
            _id: -1
        };

        store.dispatch(addReminder(reminder));

        expect(store.getState().event.error).toBe("The event time is required");
        expect(store.getState().event.data).toMatchObject({});
    });

    test(`When adding a new valid reminder, should be saved`, () => {

        const reminder = {
            title: "Meeting with the Rosetta team",
            description: "",
            place: "",
            eventColor: "#232383",
            eventDate: "2021-02-28",
            eventTime: "10:30",
            _id: 1
        };

        store.dispatch(addReminder(reminder));

        expect(store.getState().event.error).toBe(undefined);
        expect(store.getState().event.data).toMatchObject({
            [reminder.eventDate]: {
                reminders: [reminder]
            }
        });
    });

    test(`When adding a new reminder with a city, should be saved and has weather info`, (done) => {

        const reminder = {
            title: "Meeting with the Rosetta team",
            description: "",
            place: "Miami",
            eventColor: "#232383",
            eventDate: "2021-02-28",
            eventTime: "08:30",
            _id: 830
        };

        store.dispatch(addReminder(reminder));

        setTimeout((doneHandler)=> {
            const place = reminder.place.toUpperCase();
            expect(store.getState().event.error).toBe(undefined);
            expect(store.getState().event.data[reminder.eventDate].weather[place]).not.toBeFalsy();

            doneHandler();
        }, 1000, done);
    });

    afterEach(() => {
        store = null
    });
});