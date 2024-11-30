// import {} from 'react';

import { Button } from "@/components/ui/button";

export const Start = () => {
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
        {/* <UserAuthForm /> */}
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Button
            // href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button
            // href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Button>
          .
        </p>
      </div>
    </div>
  );
};
