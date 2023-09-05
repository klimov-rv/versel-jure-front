import OpenAI from "openai";
import React, { useEffect, useState, FC } from "react";
import './ChatAi.scss'

const API_KEY = "";

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

enum role {
  USER = "user",
  GPT = "gpt",
}

interface Message {
  role: role;
  content: string;
}

async function askGpt(message: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message;
}

interface ChatAiProps {
  active: boolean;
  setActive: (v: boolean) => void;
}

const ChatAi: FC<ChatAiProps> = ({ active, setActive }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [answer, setAnswer] = useState<Message>();
  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    if (message) {
      setMessages([...messages, { role: role.USER, content: message }]);
      askGpt(message)
        .then((response) => {
          if (response.content) {
            setAnswer({ role: role.GPT, content: response.content });
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setMessage("");
    }
  };

  useEffect(() => {
    if (answer) {
      setMessages([...messages, answer]);
      setAnswer(undefined);
    }
  }, [answer]);

  return (
    <div className="fetch">
      <button onClick={() => setActive(true)}>Спросить у ИИ</button>
      <div className={`wrapper ${active && "active"}`}>
        <div className="modal">
          <button onClick={() => setActive(false)}>close</button>
          <div className="messages">
            {messages.map((message, id) => (
              <p className={`message ${message.role}`} key={id}>
                {message.content}
              </p>
            ))}
          </div>
          <div className="input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAi;
