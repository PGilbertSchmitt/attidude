import { useCreateNewChat } from "@/api/session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSetSession } from "@/hooks/useSetSession";
import { useFormik } from 'formik';
import { useNavigate } from "react-router";

export const StartPage = () => {
  const { mutateAsync: createNewChat } = useCreateNewChat();
  const setSession = useSetSession();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      topic: '',
    },
    onSubmit: async (values) => {
      const result = await createNewChat(values);
      if (result) {
        setSession({
          name: values.name,
          roomKey: result.data.room_key,
          sessionToken: result.data.session_token,
        });
        const inviteUrl = `http://localhost:5173/join?topic=${values.topic}&room_key=${result.data.room_key}`;
        navigator.clipboard.writeText(inviteUrl);
        navigate('/chat');
      }
    },
  });
  
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Let's Start a Chat
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your name and a topic to begin
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
          <Input
            id="topic"
            placeholder="What do you want to talk about?"
            type="text"
            autoCorrect="on"
            value={formik.values.topic}
            disabled={false}
            onChange={formik.handleChange}
          />
          <Button>Create invite</Button>
        </form>
      </div>
    </div>
  );
};
