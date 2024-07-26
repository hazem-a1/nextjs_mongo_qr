'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QRDesigner from '@/components/QRDesigner';

interface LinkData {
  _id?: string;
  shortCode: string;
  targetUrl: string;
  qrDesign: {
    backgroundColor: string;
    foregroundColor: string;
  };
}

export default function LinkForm({ initialData }: { initialData: LinkData | null }) {
  
  const router = useRouter();
  const [link, setLink] = useState<LinkData>(
    initialData || {
      shortCode: '',
      targetUrl: '',
      qrDesign: {
        backgroundColor: '#FFFFFF',
        foregroundColor: '#000000',
      },
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLink((prev) => ({ ...prev, [name]: value }));
  };

  const handleDesignChange = (newDesign: LinkData['qrDesign']) => {
    setLink((prev) => ({ ...prev, qrDesign: newDesign }));
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

      router.push('/links');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {link._id ? 'Edit Link' : 'Create New Link'}
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="shortCode" className="block text-sm font-medium text-gray-700">
            Short Code
          </label>
          <input
            type="text"
            id="shortCode"
            name="shortCode"
            value={link.shortCode}
            onChange={handleInputChange}
            required
            className="bg-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700">
            Target URL
          </label>
          <input
            type="url"
            id="targetUrl"
            name="targetUrl"
            value={link.targetUrl}
            onChange={handleInputChange}
            required
            className="bg-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">QR Code Design</h2>
          <QRDesigner value={`http://localhost:3000/api/redirect/${link.shortCode}`} onDesignChange={handleDesignChange} />
        </div>
        <div>
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