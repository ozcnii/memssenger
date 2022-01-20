import React from "react";
import s from "../Messages.module.css";
import Message from "../Message/Message";
import ScrollableFeed from "react-scrollable-feed";

const innerHeight = window.innerHeight;

export default function MessagesWrapper({ messages, user }) {
    return (
        <>
            <div
                className={s.messagesWrapper}
                style={{ height: innerHeight - 168 + "px" }}
            >
                <ScrollableFeed>
                    {messages.map(({ message, uid, date }, i) => (
                        <Message
                            key={`message_key_${i}`}
                            message={message}
                            userUid={user.uid}
                            uid={uid}
                            date={date}
                        ></Message>
                    ))}
                </ScrollableFeed>
            </div>
        </>
    );
}
