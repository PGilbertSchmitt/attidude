import { useJoinChat } from "@/api/session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSetSession } from "@/hooks/useSetSession";
import { useFormik } from 'formik';
import { useNavigate, useSearchParams } from "react-router";

export const JoinPage = () => {
  const { mutateAsync: joinChat } = useJoinChat();
  const [params] = useSearchParams();
  const setSession = useSetSession();
  const navigate = useNavigate();

  const roomKey = params.get('room_key');
  const topic = params.get('topic');

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      if (roomKey) {
        const result = await joinChat({
          name: values.name,
          roomKey,
        });
        setSession({
          name: values.name,
          roomKey,
          sessionToken: result?.data.session_token,
        });
        navigate('/chat');
      }
    },
  });

  if (roomKey === null) {
    return (
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Invalid Room Key
            </h1>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Let's Start a Chat{topic && ' about:'}
          </h1>
          {topic && (
            <h2>
              {topic}
            </h2>
          )}
          <p className="text-sm text-muted-foreground">
            Enter your name
          </p>
        </div>
        <form onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          formik.submitForm();
        }}>
          <Input
            id="name"
            placeholder="Your name..."
            type="text"
            autoCorrect="off"
            value={formik.values.name}
            disabled={false}
            onChange={formik.handleChange}
          />
          <Button>Join Chat</Button>
        </form>
      </div>
    </div>
  );
};
