import nodemailer from 'nodemailer';

export const transporterAndMailOption = (email:string, pass:string, serviceProviderType:string) => {
  return {
    transporter: nodemailer.createTransport({
      service: serviceProviderType,
      auth: {
        user: email,
        pass,
      },
    }),

    mailOptions: {
      from: email,
      to: email,
    },
  };
};
