import NeonButton from "./NeonButtonLink";

const PleaseLoginFirst: React.FC = ()=> {
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
export default PleaseLoginFirst