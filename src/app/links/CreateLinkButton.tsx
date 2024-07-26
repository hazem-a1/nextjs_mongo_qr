'use client';

import Link from 'next/link';

export function CreateLinkButton() {
  return (
    <Link href="/links/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Create New Link
    </Link>
  );
}