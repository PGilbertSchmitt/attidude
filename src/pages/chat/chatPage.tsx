import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";
import { useNavigate } from "react-router";


export const ChatPage = () => {
  const sessionData = useSession();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (sessionData === null) {
      navigate('/');
    }
  }, [sessionData]);
  
  const { name, roomKey, sessionToken } = sessionData!;
  
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Chat time
          </h1>
          <p>Name: {name}</p>
          <p>Room Key: {roomKey}</p>
          <p>Token: {sessionToken}</p>
        </div>
      </div>
    </div>
  );
};
