import React, { useState, useEffect } from "react";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import Messages from "./Messages";
import Input from "./Input";
import { Header } from "./Header";
import { useAuthContext } from "@asgardeo/auth-react";
import { getAnswer, getChatbotGreeting } from "../api/chat";

export default function ChatBot() {
  const [messages, setMessages] = useState<any>([]);

  const { getAccessToken } = useAuthContext();

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage key="0" fetchMessage={async () => getChatbotGreeting()} />,
      ]);
    }
    loadWelcomeMessage();
  }, []);

  async function send(text: string) {
    const accessToken = await getAccessToken();
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await getAnswer(accessToken, text)}
      />
    );
    setMessages(newMessages);
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <Header />
        <Messages messages={messages} />
        <Input onSend={send} />
      </div>
    </div>
  );
}
