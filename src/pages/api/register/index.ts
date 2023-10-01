import { User } from '@/interface';
import { IdGen } from '@/utils/helpers';
import { createUserByCredentials, getUserByEmail } from '@/utils/outerbase-req/users';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

const RegisterUser = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      try {
        const { name, email, password } = req.body as {
          name: string;
          email: string;
          password: string;
        };
        if (!name || !email || !password) {
          return res
            .status(400)
            .json({ success: false, error: 'A field value was not provided' });
        }
        const foundUser = await getUserByEmail(email);

        if (foundUser) {
          return res.status(400).json({
            success: false,
            error: 'User already have an account.',
          });
        }

        if (!foundUser) {
          const hashedPassword = await bcrypt.hash(password, 12);
          const newUsername = email.split('@').shift()!;
          const user: User = {
            name,
            email,
            username: newUsername,
            password: hashedPassword,
            image: '/default-user-profile.jpg',
            id: IdGen('USER'),
          };
          const resultState = await createUserByCredentials(user);
          if (resultState) {
            const findNewAddedUser = await getUserByEmail(email);
            return res
              .status(201)
              .json({ success: resultState, data: findNewAddedUser });
          } else {
            return res.status(500).json({
              success: false,
              error: 'Account not created. Try Again',
            });
          }
        }
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, error: 'An error occurred' });
      }
      break;

    default:
      return res
        .status(500)
        .json({ success: false, error: 'Method not allowed' });
      break;
  }
};

export default RegisterUser;
