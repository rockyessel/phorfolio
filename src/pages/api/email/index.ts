import { transporterAndMailOption } from '@/utils/config/nodemailer';
import { contactTemp } from '@/utils/email-temp';
import { getAboutMeByUserId } from '@/utils/outerbase-req/about';
import { findUserByUsername, getUsersEnvByUserId} from '@/utils/outerbase-req/users';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function SendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name, message, subdomain } = req.body;

    const user = await findUserByUsername(subdomain);
    const aboutMeData = await getAboutMeByUserId(user.id);
    const { next_public_email, next_public_email_pass } =
      await getUsersEnvByUserId(user.id);

    const { mailOptions, transporter } = transporterAndMailOption(
      next_public_email,
      next_public_email_pass,
      'gmail'
    );

    const baseURL =
      process.env.NODE_ENV === 'production'
        ? `${subdomain}.phorfolio.site`
        : `${subdomain}.localhost:3000`;

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: `@${subdomain}. Someone reached out!`,
        html: contactTemp(message, user, { name, email }, aboutMeData, baseURL),
      });

      return res.status(200).json({ msg: 'Sent Successfully' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ msg: 'Internal Problem In TryAndCatch block' });
    }
  }
  return res.status(400).json({ msg: 'Internal Problem in Entirely' });
}
