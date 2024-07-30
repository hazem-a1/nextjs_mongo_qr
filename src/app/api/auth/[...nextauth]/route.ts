import { authOptions } from '@/auth/authOptions';
import dbConnect from '@/db/dbconnect';
import NextAuth from 'next-auth';

const handler =()=>{
// Ensure database connection
    dbConnect();
  return  NextAuth(authOptions);
} 

export { handler as GET, handler as POST };