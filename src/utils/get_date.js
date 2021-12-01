export default function getDate(date) {
    if (date) {
        const thisDate = new Date(date.seconds * 1000);

        let hours = thisDate.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        };

        let minutes = thisDate.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        };

        const messageDate = `${hours}:${minutes}`;

        return messageDate;
    }
}