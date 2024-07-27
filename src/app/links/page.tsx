
import DynamicLink from '@/models/DynamicLink';
import dbConnect from '@/db/dbconnect';
import { LinkList } from './LinkList';
import NeonButton from '@/components/NeonButtonLink';
import { _id } from '@next-auth/mongodb-adapter';
import { getCurrentUser } from '@/auth/auth';


export default async function LinkListingPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 rounded-lg shadow-md">
        <div className="flex flex-col justify-between items-center mb-6">
      <div>
      <h1 className="text-4xl font-bold mb-3 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
      Please log in to view your dashboard.
      </h1>
      </div>
      <div>

      <NeonButton href="/api/auth/signin">Sign In</NeonButton>
      </div>
      </div>
    </div>
    );
  }

  await dbConnect();
  const links = await DynamicLink.find({ createdBy: user.id }).sort({ createdAt: -1 });

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold mb-3 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
      Your Links
          </h1>
        <NeonButton href="/links/new">Create Link</NeonButton>
      </div>
      <LinkList initialLinks={JSON.parse(JSON.stringify(links))} />
    </div>
  );
}