'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QRDesignerStyle from '@/components/QRDesignerStyle';
import { Options } from 'qr-code-styling';
import { getDefaultQrOptions } from '@/helper/getDefaultQrOptions';

interface LinkData {
  _id?: string;
  shortCode: string;
  targetUrl: string;
  qrStyleOptions: Options
}

export default function LinkForm({ initialData }: { initialData: LinkData | null }) {
  
  const router = useRouter();
  const [link, setLink] = useState<LinkData>(
    initialData || {
      shortCode: '',
      targetUrl: '',
      qrStyleOptions: getDefaultQrOptions('')
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLink((prev) => ({ ...prev, [name]: value }));
    if (name === "targetUrl") setLink((prev) => ({...prev, qrStyleOptions: {...prev.qrStyleOptions,data: value}}))
  };

  const handleDesignChange = (newDesign: Options) => {
    setLink((prev) => ({ ...prev, qrStyleOptions: newDesign }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = link._id ? `/api/links/${link._id}` : '/api/links';
      const method = link._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
      });
      
      if (!response.ok){
        const errorResponse = await response.json()
        throw new Error(errorResponse.error || 'Failed to save link');
      } 
      router.refresh()
      router.push('/links');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md items-center justify-items-center place-items-center flex flex-col">
      <h1 className="text-2xl font-bold mb-6 ">
        {link._id ? 'Edit Link' : 'Create New Link'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 items-center">
        <div className='items-center'>
          <label htmlFor="shortCode" className="block text-sm font-medium text-gray-300">
            Short Code
          </label>
          <input
            type="text"
            id="shortCode"
            maxLength={30}
            name="shortCode"
            value={link.shortCode}
            onChange={handleInputChange}
            placeholder='myawsomeqr'
            required
            className="text-gray-700 max-w-2xl mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-300">
            Target URL
          </label>
          <input
            type="url"
            id="targetUrl"
            name="targetUrl"
            value={link.targetUrl}
            onChange={handleInputChange}
            required
            placeholder='http://google.com'
            className="max-w-2xl text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">QR Code Design</h2>
          <QRDesignerStyle initialDesign={link.qrStyleOptions} value={`${process.env.NEXT_PUBLIC_DOMAIN}/api/redirect/${link.shortCode}`} onDesignChange={handleDesignChange} />
        </div>
        <div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Saving...' : 'Save Link'}
          </button>
        </div>
      </form>
    </div>
  );
}