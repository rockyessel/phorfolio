import { HomeContent } from '@/interface';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.NEXT_PUBLIC_OUTERBASE_URL!;

export const getMainContentHero = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/components/main-hero`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createHomeContent = async (homeContent: HomeContent) => {
  try {
    const l = toast.loading('Creating & Publishing content');
    const { data } = await axios.post(`${baseURL}/components/create`, {
      ...homeContent,
    });
    if (data.success) {
      toast.done(l);
      toast.success('Created & Published successfully');
    } else if (!data.success && data.error) {
      toast.error('Something went wrong. Try again.');
    } else {
      toast.error('Unknown error occurred. Refresh the page');
    }
  } catch (error) {
    toast.dismiss();
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log(axiosError.message);
      toast.error(axiosError.message);
    }
  }
};

export const getHomeContentByUserId = async (userId: string) => {
  const { data } = await axios.get<{ response: { items: HomeContent[] } }>(
    `${baseURL}/components/id?userId=${userId}`
  );
  return data.response.items?.[0];
};

export const updateHomeContent = async (
  homeContent: HomeContent,
  userId: string
) => {
  try {
    const l = toast.loading('Updating content');
    const { data } = await axios.put(
      `${baseURL}/compoenets/update?userId=${userId}`,
      {
        ...homeContent,
      }
    );
    if (data.success) {
      toast.done(l);
      toast.success('Updated successfully');
    } else if (!data.success && data.error) {
      toast.error('Something went wrong. Try again.');
    } else {
      toast.error('Unknown error occurred. Refresh the page');
    }
  } catch (error) {
    toast.dismiss();
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log(axiosError.message);
      toast.error(axiosError.message);
    }
  }
};

export const isHomeContentCreated = async (userId: string) => {
  const { data } = await axios.get<{
    response: { items: { exists: boolean }[] };
  }>(`${baseURL}/components/checker?userId=${userId}`);
  return data.response.items?.[0]?.exists;
};
