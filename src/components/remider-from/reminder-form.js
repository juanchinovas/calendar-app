
function ReminderForm({reminder}) {

    return (
        <div className="form">
            <div className="form-input">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" defaultValue={(reminder && reminder.title) || ""}/>
            </div>
            <div className="form-input">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" rows="5" maxLength="30" defaultValue={(reminder && reminder.description) || ""}></textarea>
            </div>
            <div className="form-input">
                <label htmlFor="place">City</label>
                <input type="text" name="place" id="place" defaultValue={(reminder && reminder.place) || ""}/>
            </div>
            <div className="form-input">
                <label htmlFor="eventColor">Color</label>
                <input type="color" name="eventColor" id="eventColor" defaultValue={(reminder && reminder.eventColor) || ""}/>
            </div>
            <div className="form-input">
                <label htmlFor="eventDate">Date</label>
                <input type="date" name="eventDate" id="eventDate" defaultValue={(reminder && reminder.eventDate) || ""}/>
            </div>
            <div className="form-input">
                <label htmlFor="eventTime">Time</label>
                <input type="time" name="eventTime" id="eventTime" defaultValue={(reminder && reminder.eventTime) || ""}/>
            </div>
        </div>
    );
}

export default ReminderForm;