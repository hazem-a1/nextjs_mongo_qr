
import DynamicLink from '@/models/DynamicLink';
import { getCurrentUser } from '../api/auth/auth';
import dbConnect from '@/db/dbconnect';
import { CreateLinkButton } from './CreateLinkButton';
import { LinkList } from './LinkList';


export default async function LinkListingPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  await dbConnect();
  const links = await DynamicLink.find({ createdBy: user.id }).sort({ createdAt: -1 });

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Links</h1>
        <CreateLinkButton />
      </div>
      <LinkList initialLinks={JSON.parse(JSON.stringify(links))} />
    </div>
  );
}