import s from './../Messages.module.css'

export default function Message({message, uid, userUid, date}) {
    let messageDate = null;

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
        messageDate = `${hours}:${minutes}`

    }

    return (
        <div className={s.messageContainer} style={{ justifyContent: uid === userUid && 'flex-end', textAlign: uid === userUid && 'right' }} >
            <div className={s.message}>
                    <span className={s.messageText}>{message}</span>
                    { date 
                    ? <span className={s.messageDate}> {messageDate} </span> 
                    : null 
                }
            </div>
                
        </div>
    )
}
