import { getCurrentUser } from './api/auth/auth';
import FeatureCard from '@/components/FeturedCard';
import NeonButton from '@/components/NeonButtonLink';


export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div className="bg-gray-900 min-h-screen text-white">

      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            QR Star
          </h1>
          <p className="text-xl text-gray-300">Create, customize, and track your short links with style</p>
        </header>

        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <FeatureCard 
            title="Dynamic Links" 
            description="Create short links that adapt to your needs"
            icon="🔗"
          />
          <FeatureCard 
            title="Custom QR Codes" 
            description="Design unique QR codes for your brand"
            icon="📱"
          />
          <FeatureCard 
            title="Easy Integration" 
            description="Seamlessly integrate with your existing workflow"
            icon="🔌"
          />
        </section>

        <div className="flex justify-center space-x-8">
        {user ? (
          <NeonButton href="/links">Dashboard</NeonButton>
      ) : (
          <NeonButton href="/api/auth/signin">Sign In</NeonButton>
      )}
          
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500">
        © 2024 QR Star. All rights reserved.
      </footer>
    </div>
  );
}