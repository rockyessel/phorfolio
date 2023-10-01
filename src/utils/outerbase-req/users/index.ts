import { User, UserAccountEnvProps } from '@/interface';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.NEXT_PUBLIC_OUTERBASE_URL!;

export const createUserByCredentials = async (user: User) => {
  const response = await axios.post<{ success: boolean }>(
    `${baseURL}/users/create`,
    { ...user }
  );
  return response.data.success;
};

export const createUserByProviders = async (user: User) => {
  try {
    const response = await axios.post(`${baseURL}/users/create`, { ...user });

    return response.data.success;

  } catch (error) {
    console.log(error);
    toast.error('Unknown error');
  }
};

export const getUserByEmail = async (email: string) => {
  const { data } = await axios.get(`${baseURL}/users/email?email=${email}`);

  return data.response.items?.[0] as User;
};

export const findUserByUsername = async (username: string) => {
  const response = await fetch(
    `${baseURL}/users/username?username=${username}`
  );
  const data = await response.json();
  return data.response.items?.[0] as User;
};

export const getAllUsername = async () => {
  const { data } = await axios.get(`${baseURL}/users/username/all`);
  const users = data.response.items as User[];
  return users.map((user) => {
    return { username: user.username };
  });
};

export const userStaticPaths = async () => {
  const usernames = await getAllUsername();
  return usernames.map((username) => {
    return { params: { subdomain: username.username } };
  });
};

export const getAllUserArticlesSlugs = async (userId: string) => {
  const { data } = await axios.get<{ response: { items: { slug: string }[] } }>(
    `${baseURL}/users/articles/slug/all?userId=${userId}`
  );
  return data.response.items;
};
export const getAllUsersProjectsSlugs = async (userId: string) => {
  const { data } = await axios.get<{ response: { items: { slug: string }[] } }>(
    `${baseURL}/users/projects/slug/all?userId=${userId}`
  );
  return data.response.items;
};

export const getUserById = async (userId: string) => {
  const { data } = await axios.get<{ response: { items: User[] } }>(
    `${baseURL}/users/id?userId=${userId}`
  );
  return data.response.items?.[0];
};

export const createUserEnvVariable = async (EnvVariable: any) => {
  try {
    const l = toast.loading('Adding env.variable');
    const { data } = await axios.post(`${baseURL}/users/env/create`, {
      ...EnvVariable,
    });

    if (data.success) {
      toast.done(l);
      toast.success('Evn.variable aaded successfully');
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

export const updateUserEnvVariable = async (EnvVariable: any,userId:string) => {
  try {
    const l = toast.loading('Updating env.variable');
    const { data } = await axios.put(`${baseURL}/users/env/update?userId=${userId}`, {
      ...EnvVariable,
    });

    if (data.success) {
      toast.done(l);
      toast.success('Evn.variable updated successfully');
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

export const getUsersEnvByUserId = async (userId: string) => {
  const { data } = await axios.get<{ response: { items: UserAccountEnvProps[] } }>(
    `${baseURL}/users/env/userId?userId=${userId}`
  );
  return data.response.items?.[0];
};

export const isUserEnvAlreadyCreated = async (userId: string) => {
  const { data } = await axios.get<{
    response: { items: { exists: boolean }[] };
  }>(`${baseURL}/users/env/checker?userId=${userId}`);
  return data.response.items?.[0]?.exists;
};
 