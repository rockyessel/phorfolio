import { authOptions } from '@/utils/auth/options';
import NextAuth from 'next-auth/next';

export default NextAuth(authOptions);
