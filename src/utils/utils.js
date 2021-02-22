export function calculateStartDate({ currentDate = new Date(), maxColumns }) {

    const diaInMilliseconds = 24 /*h*/ * 60 /*m*/ * 60 /*s*/ * 1000 /*ms*/;

    const monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startWeekDay = monthStartDate.getDay();
    monthStartDate.setDate(monthStartDate.getDate() - startWeekDay);

    const monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const totalDaysToEndCurrentMonth = Math.ceil(monthEndDate.getTime() - monthStartDate.getTime()) / diaInMilliseconds;
    if (totalDaysToEndCurrentMonth < maxColumns) {
        monthEndDate.setDate(monthEndDate.getDate() + (maxColumns - totalDaysToEndCurrentMonth));
    }

    return ({
        monthStartDate,
        monthEndDate
    });
}

export function eventSorter(event1, event2) {
    return event1._id - event2._id;
}

export function formToObject(form) {
    const len = form.elements.length;
    const objForm = {};
    const name = (name) => name.split(/\w+(-|_)\w+/).map((n,i) => i ===0? n: n[0].toUpperCase()+n.substr(1)).join("");
    const value = (value) => (value==="" || isNaN(+value))? value.trim(): +value;
    for (let i = 0; i < len; i++) {
        const element = form.elements[i];
        if (element.tagName === "BUTTON") continue;
        objForm[name(element.name || element.id)] = value(element.value);
    }

    return objForm;
}

export function formatDate(date) {
    if (!date) return "-";

    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function stringToDate(date) {
    if (!date) return "-";
    return new Date(`${date}T00:00:00`);
}