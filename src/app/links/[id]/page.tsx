import { notFound } from 'next/navigation';

import DynamicLink from '@/models/DynamicLink';
import dbConnect from '@/db/dbconnect';
import { getCurrentUser } from '@/app/api/auth/auth';
import LinkForm from './LinkForm';

export default async function LinkPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const user = await getCurrentUser();

  if (!user) {
    // Redirect to login or show an error
    return <div>Please log in to view this page.</div>;
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