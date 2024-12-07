import { cn } from "@/lib/utils";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { useSession } from "@/hooks/useSession";
import { useSetSession } from "@/hooks/useSetSession";
import { Link } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({
  children
}: LayoutProps) => {
  const sessionData = useSession();
  const setSession = useSetSession();
  // const navigate = useNavigate();

  return (
    <>
      <div className={cn('absolute top-0 right-0 p-2 flex flex-row items-center gap-3')}>
      <Link to='/chat'>Chat</Link>
        {sessionData ? (
          <Button
            variant='outline'
            onClick={() => setSession()}
          >Logout</Button>
        ) : (          
          <Button
            variant='outline'
            onClick={() => setSession({
              name: 'abc',
              roomKey: '123',
              sessionToken: 'asdf;lkj',
            })}
          >Fake Login</Button>
        )}
        <ModeToggle />
      </div>
      {children}
    </>
  );
};
