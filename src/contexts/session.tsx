import { createContext, useEffect, useState } from "react";

const LOCAL_SESSION_DATA_KEY = 'SESSION_DATA';

interface SessionState {
  name?: string;
  roomKey?: string;
  sessionToken?: string;
}

interface SessionDispatch {
  storeSession: (session: SessionState) => void;
}

type SessionContextType = (SessionDispatch & SessionState);

export const SessionContext = createContext<SessionContextType | null>(null);

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    const localData = localStorage.getItem(LOCAL_SESSION_DATA_KEY);
    if (localData !== null) {
      const sessionInfo = JSON.parse(localData) as SessionState;
      setSession(sessionInfo);
    }
  }, []);

  return (
    <SessionContext.Provider value={{
      ...session,
      storeSession: (session) => {
        localStorage.setItem(LOCAL_SESSION_DATA_KEY, JSON.stringify(session));
        setSession(session);
      }
    }}>
      {children}
    </SessionContext.Provider>
  );
};
