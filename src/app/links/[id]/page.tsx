import { notFound } from 'next/navigation';

import DynamicLink from '@/models/DynamicLink';
import dbConnect from '@/db/dbconnect';
import LinkForm from './LinkForm';
import { getCurrentUser } from '@/auth/auth';
import PleaseLoginFirst from '@/components/pleaseLoginFirst';

export default async function LinkPage({ params }: { params: { id: string } }) {
  await dbConnect();
  
  const user = await getCurrentUser();

  if (!user) {
    // Redirect to login or show an error
    return <PleaseLoginFirst />
  }

  let link = null;
  if (params.id !== 'new') {
    link = await DynamicLink.findOne({ _id: params.id, createdBy: user.id });
    if (!link) {
      notFound();
    }
  }

  return <LinkForm initialData={link} />;
}