import { MessageProps } from '@/interface';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.NEXT_PUBLIC_OUTERBASE_URL!

export const createMessage = async (message: MessageProps) => {
  try {
    await axios.post(`${baseURL}/chat/message/create`, {
      ...message,
    });
  } catch (error) {
    toast.dismiss();
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log(axiosError.message);
      toast.error(axiosError.message);
    }
  }
};


export const getLastMessageByUserId = async (userId: string) => {
  const { data } = await axios.get<{ response: { items: MessageProps[] } }>(
    `${baseURL}/chat/messages/last?userId=${userId}`
  );

  return data.response.items?.[0];
};