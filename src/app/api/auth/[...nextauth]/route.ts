import { authOptions } from '@/auth/authOptions';
import dbConnect from '@/db/dbconnect';
import NextAuth from 'next-auth';

dbConnect();
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };