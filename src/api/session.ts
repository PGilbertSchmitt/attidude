import { useMutation } from '@tanstack/react-query';
import { Client } from './client';

interface NewChatParams {
  name: string;
  topic: string;
}

interface NewChatSuccessResponse {
  session_token: string;
  room_key: string;
}

// interface ErrorResponse422 {
//   detail: Array<{
//     loc: string[];
//     msg: string;
//     type: string;
//   }>;
// }

export const useCreateNewChat = () => useMutation({
  mutationFn: async ({ name, topic }: NewChatParams) => {
    try {
      const result = Client.post<NewChatSuccessResponse>('/api/chat/new', {
        name,
        topic,
      });
      return result;
    } catch (err) {
      console.warn(err);
      return null;
    }
  },
  retry: false,
});

interface JoinChatParams {
  name: string;
  roomKey: string;
}

interface JoinChatSuccessResponse {
  session_token: string;
  room_key: string;
}

export const useJoinChat = () => useMutation({
  mutationFn: async ({ name, roomKey }: JoinChatParams) => {
    try {
      const result = Client.post<JoinChatSuccessResponse>('/api/chat/join', {
        name,
        room_key: roomKey,
      });
      return result;
    } catch (err) {
      console.warn(err);
      return null;
    }
  }
});
