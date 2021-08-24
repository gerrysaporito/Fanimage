
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export enum DATE_FORMAT {
    INPUT = "INPUT",
    DASH = "DASH",
    SLASH = "SLASH",
    WRITTEN = "WRITTEN"
}

export const formatDate = (utcDateString: string | undefined, type: DATE_FORMAT) => {
    if (!utcDateString) {
        return "N/A";
    }

    const localDateString = new Date(utcDateString).toString();
    const localDate = new Date(localDateString);

    const day = localDate.getDay();
    const dateOfMonth = localDate.getDate() > 9 ? localDate.getDate() : `0${localDate.getDate()}`;
    const month = localDate.getMonth() + 1 > 9 ? localDate.getMonth() + 1 : `0${localDate.getMonth() + 1}`;
    const year = localDate.getFullYear();

    let formattedDate: string;
    switch (type) {
        case DATE_FORMAT.INPUT: {
            formattedDate = `${year}-${month}-${dateOfMonth}`;
            break;
        }
        case DATE_FORMAT.DASH: {
            formattedDate = `${month}-${dateOfMonth}-${year}`;
            break;
        }
        case DATE_FORMAT.SLASH: {
            formattedDate = `${month}/${dateOfMonth}/${year}`;
            break;
        }
        case DATE_FORMAT.WRITTEN: {
            const writtenWeekDay = weekDays[parseInt(day.toString())];
            const writtenMonth = months[parseInt(month.toString())];
            formattedDate = `${writtenWeekDay} ${writtenMonth} ${dateOfMonth}, ${year}`;
            break;
        }
    }
    return formattedDate;
};

export const validateDateInput = (inputDates: string[]): string[] => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    const invalidDateInputs: string[] = [];

    for (const inputDate of inputDates) {
        const date = new Date(inputDate);
        const dateInTime = date.getTime();

        if (!inputDate.match(regEx)) {
            invalidDateInputs.push(inputDate);
        } else if (!date && dateInTime !== 0) {
            invalidDateInputs.push(inputDate);
        } else if (date.toISOString().slice(0, 10) !== inputDate) {
            invalidDateInputs.push(inputDate);
        }
    }

    return invalidDateInputs;
};
