import { ContentCheckerProps, EditorContentOutputProps } from '@/interface';
import {
  decodeBase64ToObject,
  deserialize,
  encodeObjectToBase64,
} from '@/utils/helpers';
import { OutputData } from '@editorjs/editorjs';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import serializeJavascript from 'serialize-javascript';

const baseURL = process.env.NEXT_PUBLIC_OUTERBASE_URL!;

export const createContent = async (content: string, id: string) => {
  try {
    const l = toast.loading('Saving information');
    const { data } = await axios.post(`${baseURL}/content/create?id=${id}`, content);

    if (data.success) {
      toast.done(l);
      toast.success('Information saved successfully');
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
export const updateContent = async (content: string, id: string) => {
  try {
    const l = toast.loading('Updating information');
    const { data } = await axios.put(`${baseURL}/content/update?id=${id}`, content);

    if (data.success) {
      toast.done(l);
      toast.success('Information updated successfully');
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

const contentIdChecker = async (userId: string) => {
  try {
    const { data } = await axios.get<ContentCheckerProps>(
      `${baseURL}/content/check?id=${userId}`
    );
    return data.response.items[0].exists;
  } catch (error) {
    console.log(error);
  }
};

export const createOrUpdateContent = async (
  userId: string,
  content: OutputData
) => {
  const isContentIdPresent = await contentIdChecker(userId);
  const serializedData = serializeJavascript({ ...content });
  const base64 = encodeObjectToBase64(serializedData);
  if (typeof isContentIdPresent === 'boolean' && isContentIdPresent) {
    return await updateContent(base64, userId);
  } else {
    return await createContent(base64, userId);
  }
};

export const getContent = async (id: string) => {
  const { data } = await axios.get<EditorContentOutputProps>(
    `${baseURL}/content?id=${id}`
  );
  console.log('data: ', data);
  if (data.success) {
    const doesContentExist = data.response.items[0]?.editorcontentoutput;
    if (doesContentExist) {
      const json = decodeBase64ToObject(doesContentExist);
      const content = deserialize(json);
      console.log('content: ', content);
      if (content) {
        return content;
      }
    }
  }
};
