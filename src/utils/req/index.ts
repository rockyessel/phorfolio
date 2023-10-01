import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const SendContactForm = async (data: any) => {
  try {
    const l = toast.loading('Sending e-mail...');
    const response = await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      toast.done(l);
      toast.success('Email sent successfully');
    } else {
      toast.error('An error happen while sending the email.');
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

export const getImageURL = async (files: File) => {
  try {
    const l = toast.loading('Uploading image...');
    const formData = new FormData();
    formData.append('file', files);
    const response = await axios.post<{ url: string }>(
      `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL_GENERATOR!}/api/v1/file`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.status === 200) {
      toast.done(l);
      toast.success('Image(s) uploaded successfully');
    }
    return response.data.url;
  } catch (error) {
    console.error('Error uploading images:', error);
    toast.dismiss();
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log(axiosError.message);
      toast.error(axiosError.message);
    }
  }
};

export const getMultipleFileURL = async (files: File[]) => {
  try {
    const l = toast.loading('Uploading image(s)...');
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    const response = await axios.post<{ url: string[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL_GENERATOR!}/api/v1/files`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.status === 201) {
      toast.done(l);
      toast.success('Image(s) uploaded successfully');
      return response.data.url;
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

export const generateTextToAudioURL = async (plainText: string) => {
  const l = toast.loading('Generating TTS');
  try {
    const response = await axios.post('/api/tts', { plainText });
    if (response.status === 200) {
      toast.done(l);
      toast.success('Text-To-Speech audio generated successfully');
    } else {
      toast.error('Text-To-Speech generation failed');
    }
    return response.data.url;
  } catch (error) {
    toast.dismiss();
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log(axiosError.message);
      toast.error(axiosError.message);
    }
  }
};
