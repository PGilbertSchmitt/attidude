import { createContext, useEffect, useState } from "react";

const LOCAL_SESSION_DATA_KEY = 'SESSION_DATA';

interface SessionState {
  name?: string;
  roomKey?: string;
  sessionToken?: string;
}

export const INITIAL_SESSION: SessionState = {
  name: undefined,
  roomKey: undefined,
  sessionToken: undefined,
}

interface SessionDispatch {
  storeSession: (session?: SessionState) => void;
}

type SessionContextType = (SessionDispatch & SessionState);

export const SessionContext = createContext<SessionContextType | null>(null);

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<SessionState>(INITIAL_SESSION);

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
        setSession(session || INITIAL_SESSION);
        if (session) {
          localStorage.setItem(LOCAL_SESSION_DATA_KEY, JSON.stringify(session));
        } else {
          localStorage.removeItem(LOCAL_SESSION_DATA_KEY);
        }
      }
    }}>
      {children}
    </SessionContext.Provider>
  );
};
