'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LinkData {
  _id: string;
  shortCode: string;
  targetUrl: string;
  createdAt: string;
}

export function LinkList({ initialLinks }: { initialLinks: LinkData[] }) {
  const [links, setLinks] = useState(initialLinks);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      try {
        const response = await fetch(`/api/links/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setLinks(links.filter(link => link._id !== id));
          router.refresh(); // Refresh the server component
        } else {
          throw new Error('Failed to delete link');
        }
      } catch (error) {
        console.error('Error deleting link:', error);
        alert('Failed to delete link. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <div key={link._id} className="border p-4 rounded-lg flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{link.shortCode}</h2>
            <p className="text-sm text-gray-500">{link.targetUrl}</p>
            <p className="text-xs text-gray-400">Created: {new Date(link.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="space-x-2">
            <Link href={`/links/${link._id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">
              Edit
            </Link>
            <button onClick={() => handleDelete(link._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}