import { AboutMe } from '@/interface';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.NEXT_PUBLIC_OUTERBASE_URL!

export const createAboutMe = async (aboutMe: AboutMe) => {
  try {
    const l = toast.loading('Saving information...');
    const { data } = await axios.post(`${baseURL}/about/create`, {
      ...aboutMe,
    });

    if (data.success) {
      toast.done(l);
      toast.success('information saved successfully');
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

export const isAboutMeAlreadyCreated = async (userId: string) => {
  const { data } = await axios.get<{
    response: { items: { exists: boolean }[] };
  }>(`${baseURL}/about/check?userId=${userId}`);
  return data.response.items?.[0]?.exists;
};



export const getAboutMeByUserId = async (userId: string) => {
  const { data } = await axios.get<{ response: { items: AboutMe[] } }>(
    `${baseURL}/about/userId?userId=${userId}`
  );
  return data.response?.items?.[0];
};

export const updateAboutMe = async (aboutMe: AboutMe) => {
  try {
    const l = toast.loading('Updating information...');
    const { data } = await axios.put(`${baseURL}/about/update`, {
      ...aboutMe,
    });

    if (data.success) {
      toast.done(l);
      toast.success('information updated successfully');
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
