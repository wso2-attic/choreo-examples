import React from "react";

interface UserMessageProps {
  text: string;
}

export default function UserMessage(props: UserMessageProps) {
  const { text } = props;
  return (
    <div className="message-container">
      <div className="user-message">{text}</div>
    </div>
  );
}
