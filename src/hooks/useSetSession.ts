import { SessionContext } from "@/contexts/sessionContext";
import { useContext } from "react";

export const useSetSession = () => {
  const context = useContext(SessionContext);

  if (context === null) {
    throw new Error('can only use useSession from inside the SessionProvider');
  }

  return context.storeSession;
};
