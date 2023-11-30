import React, { useEffect, useRef } from "react";

interface MessagesProps {
  messages: any[];
}

export default function Messages(props: MessagesProps) {
  const { messages } = props;
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (el.current) {
      el.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  });
  return (
    <div className="messages">
      {messages}
      <div id={"el"} ref={el} />
    </div>
  );
}
