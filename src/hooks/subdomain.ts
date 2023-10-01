import React from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export default function useSubdomain(position = 0) {
  const [subdomain] = React.useState(() => {
    try {
      return window?.location?.hostname?.split('.')[position];
    } catch (error) {
      toast.dismiss();
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log(axiosError.message);
        toast.error(axiosError.message);
      }
    }
  });

  return subdomain;
}
