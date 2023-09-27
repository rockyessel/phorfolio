import axios from "axios";

export const SendContactForm = async (data: any) => {
  try {
    await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getImageURL = async (files: File) => {
  try {
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

    // console.log('response.data.urls', response.data.url);
    return response.data.url; 
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

export const getMultipleFileURL = async (files: File[]): Promise<string[]> => {
  try {
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

    // console.log('response.data.urls', response.data.url);
    return response.data.url; 
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};
