import { useEffect, useRef, useState } from "react";


export const useChat = (roomKey: string, sessionToken: string) => {
  const ws = useRef<WebSocket | null>(null);
  const [chatReady, setChatReady] = useState(false);
  const [messages, setMessages] = useState<unknown[]>([]);

  useEffect(() => {
    const wsCurrent = new WebSocket(`wss://104.185.74.120:8080/api/chat/ws/${roomKey}?session_token=${sessionToken}`);
    wsCurrent.onopen = () => setChatReady(true);
    wsCurrent.close = () => {
      // Not sure
    };
    ws.current = wsCurrent;

    return () => {
      wsCurrent.close();
    }
  }, []);

  useEffect(() => {
    if (ws.current && chatReady) {
      ws.current.onmessage = (message: unknown) => {
        setMessages([message, ...messages]);
      }
    }
  }, [chatReady]);

  const chat = (message: unknown) => {
    if (!ws.current || !chatReady) {
      throw new Error("Can't chat yet, the connection isn't open!");
    }
    ws.current.send(message as string);
  };

  return {
    messages
  };
};
