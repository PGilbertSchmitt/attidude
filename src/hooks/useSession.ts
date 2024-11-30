import { SessionContext } from "@/contexts/session";
import { useContext } from "react";
import { isNil, none } from 'ramda';

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context === null) {
    throw new Error('can only use useSession from inside the SessionProvider');
  }

  if (none(isNil, [
    context.name,
    context.roomKey,
    context.sessionToken,
  ])) {
    return {
      name: context.name!,
      roomKey: context.roomKey!,
      sessionToken: context.sessionToken!,
    }
  }

  return null;
};
